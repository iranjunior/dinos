 
/**
 * @description Esse é o metódo responsavel por gerar a lista de dinossauros mais rapidos
 *
 * @param {object[]} dinos array de objetos com os dados dos dinossauros
 *
 * @returns {string} lista de dinossauros que ordenados de forma decrescente pela sua velocidade
 */

module.exports = (dinos) => {
  if (!Array.isArray(dinos)) {
    return new Error('O tipo esperado é um array');
  }
  const { length } = dinos;
  switch (length) {
    case 0:
      return '';
    case 1:
      return String(dinos[0].name).concat('\n');
    default:
      dinos.sort((a, b) => b.speed - a.speed);
      return dinos.map((dino) => dino.name).join('\n');
  }
};