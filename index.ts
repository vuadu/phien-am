import _ from "lodash";
import { LIST_1000 } from "./1000";
import { ENDING_VOWEL_MAPPING, LETTER_MAPPING, NULL_MAPPING } from "./constants";
import { Syllable, parse } from "./parser.generated";

const ipaDict = _(await Bun.file("./en_US.txt").text())
  .split("\n") //Split a string into substrings when endline
  .filter(_.identity)
  .map((w) => w.trim().split("\t")) // w.trim() is method removes whitespace from both sides of a string
  .fromPairs()
  .value();

const getLetters = () =>
  _(ipaDict)
    .values()
    .flatMap((ipa) => ipa.split(""))
    .uniq()
    .value();

// console.log(
//   _(ipaDict)
//     .toPairs()
//     .filter((w) => /ɡ/.test(w[1]))
//     .take(50)
//     .value()
// );

export const ipaSymbolExamples = () =>
  _(LETTER_MAPPING)
    .keys()
    .forEach((l) =>
      console.log(
        l,
        JSON.stringify(
          _(ipaDict)
            .toPairs()
            .filter((w) => new RegExp(l).test(w[1]))
            .take(5)
            .value()
        )
      )
    );


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

      // return _(i.trim())
      //   .split("")
      //   .map((c) => LETTER_MAPPING[c] ?? "")
      //   .join("");
    })
    .value();
};

export const getEndingVowels = () =>
  _(ipaDict)
    .keys()
    // .shuffle() // DevSkim: ignore DS148264
    // .take(20)
    // .concat(["messy", "less", "thought", "good"])
    .flatMap(map)
    .flatMap((m) => m.ast)
    .map((s: Syllable) => s?.parts?.[1])
    .uniq()
    .forEach((s) => {
      if (!ENDING_VOWEL_MAPPING[s ?? ""]) console.log(s);
    });

// getEndingVowels();

_(LIST_1000)
  .shuffle() // DevSkim: ignore DS148264
  .take(2)
  .concat([
    "idea",
    "consideration",
  ])
  .forEach((w) => {
    console.log(
      "==>",
      w,
      ..._(map(w))
        .map((p) => [p.ipa, p.vi /* JSON.stringify(p.ast), */])
        .value()
    );
  });
let lyric;
lyric = `There ain't no gold in this river
That I've been washing my hands in forever
I know there is hope in these waters
But I can't bring myself to swim
When I am drowning in this silence
Baby, let me in
`;
lyric = "information technology";

_(lyric)
  .split(/\n/g)
  .forEach((line) => {
    console.log(line);
    console.log(
      line
        .split(/\s/)
        .map(map)
        .map((s) => s[0].vi)
        .join(" ")
    );
  });

_("")
  .split(/\n/g)
  .forEach((line) => {
    // console.log(line);
    console.log(
      line
        .split(/\s/)
        .map(map)
        .map((s) => s[0].vi)
        .join(" ")
    );
  });
