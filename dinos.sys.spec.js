const fs = require('fs');

const listMoreFast = require('./dinos');

describe('Testes de integração', () => {
    it('Deve Listar os mais rapidos com sucesso', () => {
        listMoreFast('dataset1.csv', 'dataset2.csv', 'bipedal');

        expect(Date.now() - fs.statSync('./output.txt').mtimeMs).toBeLessThanOrEqual(10000);
    })
});