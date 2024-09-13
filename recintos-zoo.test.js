// recintos-zoo.test.js
import { RecintosZoo } from './recintos-zoo.js';

describe('Recintos do Zoologico', () => {
  test('Deve rejeitar animal inválido', () => {      
    const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.recintosViaveis).toEqual([]); 
  });

  test('Deve rejeitar quantidade inválida', () => { 
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
    expect(resultado.erro).toBe("Quantidade inválida");
    expect(resultado.recintosViaveis).toEqual([]); 
  });

  test('Não deve encontrar recintos para 10 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
    expect(resultado.erro).toBe("Não há recinto viável");
    expect(resultado.recintosViaveis).toEqual([]); 
  });

  test('Deve encontrar recinto para 1 crocodilo', () => {
    const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
    expect(resultado.erro).toBe(null);
    expect(resultado.recintosViaveis).toEqual([
      'Recinto 1 (espaço livre: 9 total: 10)'
    ]);
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test('Deve encontrar recintos para 2 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
    expect(resultado.erro).toBe(null);
    expect(resultado.recintosViaveis).toEqual([
      'Recinto 1 (espaço livre: 8 total: 10)',
      'Recinto 4 (espaço livre: 6 total: 8)',
      'Recinto 3 (espaço livre: 5 total: 7)',
      'Recinto 2 (espaço livre: 3 total: 5)'
    ]);
  });
});
