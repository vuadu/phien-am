
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from 'next';
import { ENDING_VOWEL_MAPPING, LETTER_MAPPING, NULL_MAPPING } from "../../../constants";
import { Syllable, parse } from "../../../parser.generated";
import * as fs from 'fs';
 

type wordData = {
  id: number;
  word: string,
  engspell: string;
  viespell: string;
};

const words: wordData[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Handle GET request
      res.status(200).json(words);
    } else if (req.method === 'POST') {
      // Handle POST request
      const { engspell, viespell , word} = req.body;

      if (!word) {
        return res.status(400).json({ error: 'engspell are required' });
      }

      const newWord: wordData = {   
        id: words.length + 1,
        word,
        engspell,
        viespell,
      };

      newWord.engspell = getEngSpelling(newWord.word)
      newWord.viespell = getVieSpelling(newWord.word)
      words.push(newWord);
      res.status(201).json(newWord);
    } else {
      // Handle other HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
// Ultis section
const ipa = fs.readFileSync("./en_US.txt", 'utf-8')
const ipaDict = _(ipa)
  .split("\n") //Split a string into substrings when endline
  .filter(_.identity)
  .map((w) => w.trim().split("\t")) // w.trim() is method removes whitespace from both sides of a string
  .fromPairs()
  .value();

const map = (w: string) => {
  const ipa = ipaDict[w] ?? ipaDict[w.toLowerCase()] ?? "";
  return _(ipa)
    .split(",")
    .flatMap((i) => {
      const cleaned = i.replaceAll("ɝˈ", "əˈɹ").replaceAll("ɝ", "əɹ").replaceAll("ˌ", "");
      try {
        const ast = parse(cleaned);
        if (ast.find((s) => /,/.test(s.parts[1] ?? ""))) {
          console.error(cleaned, ast);
        }
        const vi = _(ast)
          .map((s) => {
            const syllable = `${LETTER_MAPPING[s.parts[0] ?? ""] ?? ""}${
              ENDING_VOWEL_MAPPING[s.parts[1] ?? ""] ?? NULL_MAPPING
            }`
              .replaceAll("wi", "uy")
              .replaceAll("wa", "oa")
              .replaceAll("wâ", "uâ")
              .replaceAll("we", "oe")
              .replaceAll("wơ", "uơ")
              .replaceAll("ge", "ghe")
              .replaceAll("gi", "ghi")
              .replaceAll("gê", "ghê")

              .replaceAll(/hi$/g, "hy")
              .replaceAll(/ki$/g, "ky")
              .replaceAll(/li$/g, "ly")
              .replaceAll(/mi$/g, "my")
              .replaceAll(/si$/g, "sy")
              .replaceAll(/ti$/g, "ty")

              .replaceAll("qui", "quy");

            return s.stress ? syllable.toLocaleUpperCase("vi") : syllable;
          })
          .join("-");
        return [{ ipa: i, ast, vi }];
      } catch (e) {
        console.error("-------------", JSON.stringify([w, i, cleaned]));
      }
      return [];
    })
    .value();
};

const getVieSpelling = (lyric:string) => {
  let script:string = ""
  _(lyric)
  .split(/\n/g)
  .forEach((line) => {
    script = line
    .split(/\s/)
    .map(map)
    .map((s) => s[0].vi)
    .join(" ")
  });
  return script;
}

const getEngSpelling = (lyric:string) => {
  let script:string = ""
  _(lyric)
  .split(/\n/g)
  .forEach((line) => {
    script = line
    .split(/\s/)
    .map(map)
    .map((s) => s[0].ipa)
    .join(" ")
  });
  if (!script) return ( lyric + " không phải là một từ tiếng anh.")
  return script;
}
