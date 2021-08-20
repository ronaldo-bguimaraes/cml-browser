import { scan } from "./scanner";

import { parse } from "./parser";

import { analyze } from "./analyzer";

import { generate } from "./generator";

function cmlToString(string: string) {

  const scanResult = scan(string);

  const parseResult = parse(scanResult);

  const analyzeResult = analyze(parseResult);

  return generate(analyzeResult);

}

const parser = new DOMParser();

function cmlToHtml(string: string) {

  const cmlResult = cmlToString(string);

  return parser.parseFromString(cmlResult, "text/html");

}

export { cmlToString, cmlToHtml };