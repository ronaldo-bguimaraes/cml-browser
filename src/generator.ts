import { VirtualNode } from "./parser";

const VOID_TAG = new RegExp(`^(!doctype|area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$`, "i");

function generate(virtualNode: VirtualNode): string {

  const children: string[] = [];

  const attributes: string[] = [];

  for (const child of virtualNode.children) {

    children.push(child instanceof VirtualNode ? generate(child) : child);

  }

  for (const attribute of virtualNode.attributes) {

    attributes.push(` ${attribute[0]}${attribute[1] ? `=${attribute[1]}` : ""}`);

  }

  if (virtualNode.parent !== undefined) {

    return `<${virtualNode.name}${attributes.join("")}>${VOID_TAG.test(virtualNode.name) ? "" : `${children.join("")}</${virtualNode.name}>`}`;

  }

  else return `${children.join("")}`;

}

export { generate };