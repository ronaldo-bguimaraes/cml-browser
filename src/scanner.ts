const TOKEN = {

  get STRING() {
    return new RegExp(`("(?:.*?)"|'(?:.*?)')`);
  },

  get DOCTYPE() {
    return new RegExp(`(!doctype)`, "i");
  },

  get WORD() {
    return new RegExp(`(\\b(?:[\\w-]+)\\b)`);
  },

  get MODULE() {
    return new RegExp(`(@${this.WORD.source})`);
  },

  get KEYWORD() {
    return new RegExp(`(\\$${this.WORD.source})`);
  },

  get TAG() {
    return new RegExp(`(${this.DOCTYPE.source}|${this.WORD.source}|${this.MODULE.source})`, "i")
  },

  get OPEN_BRACKET() {
    return new RegExp(`(\\[)`);
  },

  get CLOSE_BRACKET() {
    return new RegExp(`(\\])`);
  },

  get BRACKETS() {
    return new RegExp(`(${this.OPEN_BRACKET.source}|${this.CLOSE_BRACKET.source})`);
  },

  get OPEN_BRACE() {
    return new RegExp(`({)`);
  },

  get CLOSE_BRACE() {
    return new RegExp(`(})`);
  },

  get BRACES() {
    return new RegExp(`(${this.OPEN_BRACE.source}|${this.CLOSE_BRACE.source})`);
  },

  get EQUAL() {
    return new RegExp(`(=)`);
  },

  get NEW_LINE() {
    return new RegExp(`(\\n)`);
  },

  get MATCH() {
    return new RegExp(`(${this.STRING.source}|${this.TAG.source}|${this.KEYWORD.source}|${this.BRACKETS.source}|${this.BRACES.source}|${this.EQUAL.source}|${this.NEW_LINE.source})`, "gi");
  }

}

const EXACT = {

  get STRING() {
    return new RegExp(`^${TOKEN.STRING.source}$`);
  },

  get DOCTYPE() {
    return new RegExp(`^${TOKEN.DOCTYPE.source}$`, "i");
  },

  get WORD() {
    return new RegExp(`^${TOKEN.WORD.source}$`);
  },

  get MODULE() {
    return new RegExp(`^${TOKEN.MODULE.source}$`);
  },

  get KEYWORD() {
    return new RegExp(`^${TOKEN.KEYWORD.source}$`);
  },

  get TAG() {
    return new RegExp(`^${TOKEN.TAG.source}$`, "i")
  },

  get OPEN_BRACKET() {
    return new RegExp(`^${TOKEN.OPEN_BRACKET.source}$`);
  },

  get CLOSE_BRACKET() {
    return new RegExp(`^${TOKEN.CLOSE_BRACKET.source}$`);
  },

  get BRACKETS() {
    return new RegExp(`^${TOKEN.BRACKETS.source}$`);
  },

  get OPEN_BRACE() {
    return new RegExp(`^${TOKEN.OPEN_BRACE.source}$`);
  },

  get CLOSE_BRACE() {
    return new RegExp(`^${TOKEN.CLOSE_BRACE.source}$`);
  },

  get BRACES() {
    return new RegExp(`^${TOKEN.BRACES.source}$`);
  },

  get EQUAL() {
    return new RegExp(`^${TOKEN.EQUAL.source}$`);
  },

  get NEW_LINE() {
    return new RegExp(`^${TOKEN.NEW_LINE.source}$`);
  },

  get MATCH() {
    return new RegExp(`^${TOKEN.MATCH.source}$`, "gi");
  }

}

function scan(string: string) {

  const lexArray: string[] = [];

  const matchAll = string.matchAll(TOKEN.MATCH);

  for (const match of matchAll) {

    lexArray.push(match[0]);

  }

  return lexArray;

}

export { scan, TOKEN, EXACT };