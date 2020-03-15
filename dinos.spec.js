const fs = require('fs');
const readline = require('readline');

const listMoreFast = require('./dinos');
const writeFile = require('./writeFile');
const calculateSpeed = require('./caculateSpeed');
const nameMoreFast = require('./nameMoreFast');

jest.mock('fs');
jest.mock('readline');
jest.mock('path');

describe('Testes unitarios', () => {

    describe('Testes de escrita de arquivo em disco', () => {
        
        it('Deve listar dinos', () => {
            const mockFsCreateReadStream = fs.createReadStream.mockImplementation(() => {});
            const mockFsWriteFile = fs.writeFileSync.mockImplementation(() => {});
            const mockRlCreateInterface = readline.createInterface.mockImplementation(
                () => ({ on: (type, cb) => cb('Tyrannosaurus Rex,5.76,bipedal')}
                ));
            listMoreFast('teste1.csv', 'teste1.csv', 'bipedal');
            expect(mockRlCreateInterface).toHaveBeenCalled();
            expect(mockFsCreateReadStream).toHaveBeenCalled();
            expect(mockFsWriteFile).toHaveBeenCalled();
            expect(mockFsWriteFile.mock.calls[0][0]).toBe('output.txt');
            expect(mockFsWriteFile.mock.calls[0][1]).toContain('Tyrannosaurus Rex');
        });
        it('Deve pular linha que tem o cabeçalho', () => {
            const mockFsCreateReadStream = fs.createReadStream.mockImplementation(() => {});
            const mockRlCreateInterface = readline.createInterface.mockImplementation(
                () => ({ on: (type, cb) => cb('NAME')}
                ));
            listMoreFast('teste1.csv', 'teste1.csv', 'bipedal');
            expect(mockRlCreateInterface).toHaveBeenCalled();
            expect(mockFsCreateReadStream).toHaveBeenCalled();
        });
    });
    describe('Testes de escrita de arquivo em disco', () => {

    it('deve gravar em disco corretamente', () => {
        const mockFs = fs.writeFileSync.mockImplementation((name, data) => {});
        
        writeFile('teste', 'output.txt');

        expect(mockFs).toHaveBeenCalled()
        expect(mockFs.mock.calls[0][0]).toBe('output.txt');
        expect(mockFs.mock.calls[0][1]).toBe('teste');
    });
    it('deve gravar em disco corretamente apesar do dado não ter sido uma string', () => {
        const mockFs = fs.writeFileSync.mockImplementation((name, data) => {});
        
        writeFile(12);

        expect(mockFs).toHaveBeenCalled()
        expect(mockFs.mock.calls[0][0]).toBe('output.txt');
        expect(mockFs.mock.calls[0][1]).toBe('12');
    });
  it('deve falhar gravamento em disco devido o dado não ser valido', () => {
        const mockFs = fs.writeFileSync.mockImplementation(() => new Error('Error'));
        try {
            writeFile(null);
        } catch (error) {
            expect(error.message).toBe('Erro ao gravar arquivo');
        }
    });
    });
    
    describe('Testes de calculos de velocidade', () => {

  it('deve calcular a velocidade do dino corretamente passando strings', () => {
        
        const response = calculateSpeed('1.2', '1.45');
     
        expect(response).toBe(0.71443450831176);
    });

  it('deve calcular a falhar no calculo devido os dados passados não serem validos', () => {
        
        const response = calculateSpeed('ba', 'av');
     
        expect(response).toBe(0);
    });

  it('deve calcular a velocidade do dino corretamente passando numeros', () => {
        
        const response = calculateSpeed(1.2, 1.45);
     
        expect(response).toBe(0.71443450831176);
    });
    });
    describe('Testes da listagem de dinossauros', () => {

  it('Deve retornar a lista de dinos ordenados do mais rapido ao mais lento', () => {
        const dinos = [{name: 'dinoSlow', speed: 100}, {name: 'dinoFast', speed: 1100}, {name: 'dinoMedium', speed: 1000}];
        const response = nameMoreFast(dinos);

        expect(response.indexOf('dinoFast')).toBe(0);
        expect(response.indexOf('dinoMedium')).toBe(9);
        expect(response.indexOf('dinoSlow')).toBe(20);
    });
  it('Deve retornar apenas o nome do dinossauro passado', () => {
        const dinos = [{name: 'dinoSlow', speed: 100}];
        const response = nameMoreFast(dinos);

        expect(response.indexOf('dinoSlow')).toBe(0);
    });
  it('Deve retornar apenas uma string vazia', () => {
        const dinos = [];
        const response = nameMoreFast(dinos);

        expect(response).toBe('');
    });
    
  it('Deve falhar devido o dado enviado não ser um array', () => {
        try {
            nameMoreFast();   
        } catch (error) {
            expect(error).toBe('O tipo esperado é um array')
        }
    });
    });
});