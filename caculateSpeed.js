
/**
 * @description Esse é o metódo responsavel por calcular a velocidade de um dinossauro a partir do
 * valor do comprimento da perna e do seu passo
 *
 * @param {number | string} leg valor referente ao comprimento da perna do dinossoauro
 * @param {number | string} stance valor referente ao comprimento do passo do dinossauro
 *
 * @returns {number} valor referente a velocidade alcançada, a partir dos valores de entrada
 */

module.exports = (leg, stance) => {
    const GRAVITY = 9.8;
    leg = Number.isNaN(Number(leg)) ? 1 : Number(leg); // O valor 0.01 foi atribuido para que não houvesse uma divisão por zero
    stance = Number.isNaN(Number(stance)) ? 1 : Number(stance);
  
    return (((stance / leg) - 1) * Math.sqrt(leg * GRAVITY));
  };
