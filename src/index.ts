import { cmlToHtml } from "./cml";

const string = `

!DOCTYPE html
html lang="pt-br" {
  head {
    meta charset="utf-8"
    meta name='viewport' content="width=device-width, initial-scale=1"
    link ref="icon" href="#"
    title {"CML"}
  }
  body
  {
    declare {
      @container {
        div {
          $children
        }
      }
    }
    input id="nome"
  }
}

`;

const html = cmlToHtml(string);

document.head?.replaceWith(html.head);

document.body?.replaceWith(html.body);