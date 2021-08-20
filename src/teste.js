const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function getValue(message) {
  return new Promise(function (resolve) {
    rl.question(message, result => resolve(parseFloat(result)));
  });
}

(async function main() {

  // leituras dos dados
  const comprimentoM = await getValue("Insira o comprimento da pista (em metros): ");

  const totalVoltas = await getValue("Insira o número total de voltas a serem percorridas: ");

  const qntdAbastecimentoEsperado = await getValue("Insira o número de reabastecimentos desejados (fora o abastecimento inicial): ");

  const consumoKM_L = await getValue("Insira consumo de combustível do carro (em KM/L): ");

  rl.close();

  // cálculo

  const _comprimentoKM = comprimentoM / 1000;

  const _comprimentoTotalKM = (_comprimentoKM * totalVoltas);

  const _totalLitros = _comprimentoTotalKM / consumoKM_L;

  // calcula-se a quantidade de litros gasta até cada parada
  // soma-se 1 porque o carro foi abastecido no inicio
  const _minLitros = _totalLitros / (qntdAbastecimentoEsperado + 1);

  console.log(`\nO minímo de litros necessários para percorrer até o primeiro reabastecimento é de ${_minLitros}L`);

})();