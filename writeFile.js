const fileSystem = require('fs');

/**
 * @description Esse metódo é responsavel por escrever um dado em disco.
 *
 * @param {object} fs dependencia da função, usado para escrever os dados em disco
 * @param {string} data dado a ser gravado no arquivo de saida
 * @param {string}[file] file nome do arquivo que deverá ser gravado
 */

module.exports = (data, file = 'output.txt', fs = fileSystem,) => {
    try {
      if (typeof data !== 'string') {
        JSON.stringify(data);
      }
      fs.writeFileSync(file, data.toString());
    } catch (error) {
      throw new Error('Erro ao gravar arquivo');
    }
  };
