const fs = require("fs");

const lex = require("./lex.js");

const sem = require("./sem.js");

const [htmlx, to] = process.argv.slice(2);

if (![htmlx, to].includes(undefined)) {

  fs.readFile(htmlx, "utf-8", function (err, data) {

    if (err === null) {

      const tokenList = lex(data);

      const html = sem(tokenList);

      fs.writeFile(to, html, { encoding: "utf-8" }, function (err) {

        if (err === null) {

          console.log(`O arquivo "${to}" foi criado com sucesso!`);

        }

        else {

          console.log(err);

        }

      });

    }

    else {

      console.log(err);

    }

  });

}

else {

  console.log("Comando inválido");

  console.log("node htmlx input.htmlx output.html");

}