import { VirtualNode } from "./parser";

import { EXACT } from "./scanner";

const declareList: Map<string, VirtualNode> = new Map();

function replaceChildren(virtualNode: VirtualNode, children: (VirtualNode | string)[]) {

  for (const child of virtualNode.children) {

    if (child === "$children") {

      const index = virtualNode.children.indexOf(child);

      virtualNode.children.splice(index, 1, ...children);

    }

  }

}

function analyze(virtualNode: VirtualNode, declare?: boolean): VirtualNode {

  for (const child of virtualNode.children) {

    if (child instanceof VirtualNode) {

      if (/^(declare)$/.test(child.name)) {

        analyze(child, true);

        virtualNode.children = virtualNode.children.filter(a => a !== child);

      }

      else if (EXACT.MODULE.test(child.name)) {

        if (declare === undefined || declare === true) {

          declareList.set(child.name, child);

        }

        else {

          const object = declareList.get(child.name);

          if (object !== undefined) {

            const template = object.children[0];

            if (template instanceof VirtualNode) {

              const clone = new VirtualNode(template.name);

              for (const attribute of template.attributes) {

                clone.attributes.set(attribute[0], attribute[1]);

              }

              for (const attribute of child.attributes) {

                clone.attributes.set(attribute[0], attribute[1]);

              }

              for (const child of template.children) {

                clone.children.push(child);

              }

              clone.parent = child.parent;

              replaceChildren(clone, child.children);

              const index = virtualNode.children.indexOf(child);

              virtualNode.children.splice(index, 1, clone);

            }

          }

          else throw new Error(`Module ${child.name} not found!`);

        }

      }

      else analyze(child, false);

    }

  }

  return virtualNode;

}

export { analyze };