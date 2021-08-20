import { EXACT } from "./scanner";

enum AWAIT { DOCTYPE, CHILDREN, ATTRIBUTE, EQUAL, VALUE, OPEN_BRACE };

class VirtualNode {

  public name: string;

  public attributes: Map<string, string | undefined> = new Map();

  public children: (VirtualNode | string)[] = [];

  public parent?: VirtualNode;

  public constructor(name: string) {

    this.name = name;

  }

  public appendChild<T extends VirtualNode | string>(child: T) {

    this.children.push(child);

    if (child instanceof VirtualNode) {

      child.parent = this;

    }

    return child;

  }

  public get root(): VirtualNode {

    if (this.parent !== undefined) {

      return this.parent.root;

    }

    else return this;

  }

}

function parse(tokenList: string[]) {

  let STATE: AWAIT = AWAIT.DOCTYPE;

  let document = new VirtualNode("document");

  let ATTRIBUTE_NAME = undefined;

  let IGNORE_NEW_lINE = false;

  function createVirtualNode(name: string) {

    const node = new VirtualNode(name);

    document = document.appendChild(node);

    STATE = AWAIT.ATTRIBUTE;

  }

  function upLevel() {

    // sobe um nível
    if (document.parent !== undefined) {

      document = document.parent;

    }

  }

  for (const token of tokenList) {

    if (STATE === AWAIT.DOCTYPE) {

      if (EXACT.TAG.test(token)) {

        createVirtualNode(token);

      }

    }

    else if (STATE === AWAIT.CHILDREN) {

      if (EXACT.STRING.test(token)) {

        document.appendChild(token.slice(1, -1));

      }

      else if (EXACT.KEYWORD.test(token)) {

        document.appendChild(token);

      }

      else if (EXACT.TAG.test(token)) {

        createVirtualNode(token);

      }

      else if (EXACT.CLOSE_BRACE.test(token)) {

        upLevel();

      }

    }

    else if (STATE === AWAIT.OPEN_BRACE) {

      if (EXACT.OPEN_BRACE.test(token)) {

        STATE = AWAIT.CHILDREN;

      }

      else {

        upLevel();

        if (EXACT.KEYWORD.test(token)) {

          document.appendChild(token);

        }

        else if (EXACT.STRING.test(token)) {

          document.appendChild(token.slice(1, -1));

        }

        else if (EXACT.TAG.test(token)) {

          createVirtualNode(token);

        }

      }

    }

    else if (STATE === AWAIT.ATTRIBUTE) {

      if (EXACT.WORD.test(token)) {

        ATTRIBUTE_NAME = token;

        document.attributes.set(ATTRIBUTE_NAME, undefined);

        STATE = AWAIT.EQUAL;

      }

      else if (EXACT.NEW_LINE.test(token) && IGNORE_NEW_lINE === false) {

        STATE = AWAIT.OPEN_BRACE;

      }

      else if (EXACT.OPEN_BRACE.test(token)) {

        STATE = AWAIT.CHILDREN;

      }

      else if (EXACT.OPEN_BRACKET.test(token)) {

        IGNORE_NEW_lINE = true;

      }

      else if (EXACT.CLOSE_BRACKET.test(token)) {

        IGNORE_NEW_lINE = false;

      }

    }

    else if (STATE === AWAIT.EQUAL) {

      if (EXACT.EQUAL.test(token)) {

        STATE = AWAIT.VALUE;

      }

      else if (EXACT.WORD.test(token)) {

        ATTRIBUTE_NAME = token;

        document.attributes.set(ATTRIBUTE_NAME, undefined);

        STATE = AWAIT.EQUAL;

      }

      else if (EXACT.NEW_LINE.test(token)) {

        STATE = AWAIT.OPEN_BRACE;

      }

    }

    else if (STATE === AWAIT.VALUE) {

      if (EXACT.STRING.test(token)) {

        if (ATTRIBUTE_NAME !== undefined) {

          document.attributes.set(ATTRIBUTE_NAME, token);

        }

        STATE = AWAIT.ATTRIBUTE;

      }

      else if (EXACT.NEW_LINE.test(token)) {

        upLevel();

        STATE = AWAIT.CHILDREN;

      }

    }

  }

  return document.root;

}

export { parse, VirtualNode };