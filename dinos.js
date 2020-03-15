const _fileSystem = require('fs');
const _readline = require('readline');
const _path = require('path');
const _caculateSpeed = require('./caculateSpeed');
const _namesMoreFast = require('./nameMoreFast');
const _writeFile = require('./writeFile');

const prepareDatasFileOne = (line, dinos, hashTable, caculateSpeed, writeFile, namesMoreFast) => {
  if (line.includes('NAME')) {
    return;
  }
  const [dino, leg] = line.split(',');

  if (hashTable.has(dino)) {
    dinos.push({
      name: dino,
      speed: caculateSpeed(leg, hashTable.get(dino), dino),
    });
    writeFile(namesMoreFast(dinos));
  } else {
    hashTable.set(dino, leg);
  }
}

const prepareDatasFileTwo = (line, dinos, hashTable, characteristic, caculateSpeed, writeFile, namesMoreFast) => {
  if (line.includes('NAME')) {
    return;
  }
  const [dino, stance, type] = line.split(',');
  if (hashTable.has(dino) && type === characteristic) {
    dinos.push({
      name: dino,
      speed: caculateSpeed(hashTable.get(dino), stance),
    });
    writeFile(namesMoreFast(dinos));
  } else {
    hashTable.set(dino, stance);
  }
  if (type !== characteristic && dinos.findIndex((value) => value.name === dino) !== -1) {
    dinos = dinos.filter((dinoCurrent) => dinoCurrent.name !== dino);
    writeFile(namesMoreFast(dinos));
  }
}

/**
 * @description Esse é o metódo principal da arquivo, aqui é setado a leitura dos arquivos csv com dados sobre os Dinossauros
 *
 * @param {string} dataset1 nome do arquivo que apresenta o dataset1
 * @param {string} dataset2 nome do arquivo que apresenta o dataset2
 * @param {string} characteristic caracteristica do dinossoura que deve ser avaliada
 * @param  {...any} dependencies dependencias que serão usadas na função, devem ser o fs, readline e path, respectivamente
 */
module.exports = (
  dataset1, 
  dataset2, 
  characteristic,
  fs = _fileSystem,
  rl = _readline,
  path =_path,
  caculateSpeed = _caculateSpeed,
  namesMoreFast = _namesMoreFast,
  writeFile = _writeFile,
  ) => {
  
  let dinos = [];
  const hashTable = new Map();

  const RLDataset1 = rl.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, dataset1)),
  });

  const RLDataset2 = rl.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, dataset2)),
  });

  RLDataset1.on('line',(line) => prepareDatasFileOne(line, dinos, hashTable, caculateSpeed, writeFile, namesMoreFast));

  RLDataset2.on('line',(line) => prepareDatasFileTwo(line, dinos, hashTable, characteristic, caculateSpeed, writeFile, namesMoreFast));
};
