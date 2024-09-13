class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { macacos: 3 } },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { gazelas: 1 } },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { leoes: 1 } }
    ];

    this.animais = {
      LEAO: { tamanho: 3, bioma: 'savana' },
      LEOPARDO: { tamanho: 2, bioma: 'savana' },
      CROCODILO: { tamanho: 3, bioma: 'rio' },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
      GAZELA: { tamanho: 2, bioma: 'savana' },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
    };
  }

  analisaRecintos(animal, quantidade) {
    const animalInfo = this.animais[animal.toUpperCase()];

    // Validações de entrada
    if (!animalInfo) return { erro: 'Animal inválido' };
    if (!Number.isInteger(quantidade) || quantidade <= 0) return { erro: 'Quantidade inválida' };

    const recintosViaveis = [];

    this.recintos.forEach(recinto => {
      if (this.adequadoParaRecinto(recinto, animalInfo, quantidade)) {
        const espacoOcupado = this.calculaEspacoOcupado(recinto, animalInfo, quantidade);
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - espacoOcupado} total: ${recinto.tamanhoTotal})`);
      }
    });

    return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: 'Não há recinto viável' };
  }

  adequadoParaRecinto(recinto, animalInfo, quantidade) {
    const biomaValido = Array.isArray(animalInfo.bioma)
      ? animalInfo.bioma.includes(recinto.bioma)
      : recinto.bioma === animalInfo.bioma;

    if (!biomaValido) return false;

    // Verifica espaço necessário
    const espacoNecessario = this.calculaEspacoNecessario(recinto, animalInfo, quantidade);
    if (recinto.tamanhoTotal < espacoNecessario) return false;

    // Verifica regras especiais para animais existentes
    if (recinto.animais) {
      if (animalInfo.bioma.includes('savana') && recinto.animais.leoes && animalInfo.bioma === 'savana') {
        return false; // Leão não compartilha com outros animais
      }
      if (recinto.animais.macacos && animalInfo.bioma.includes('savana') && animalInfo.bioma !== 'savana') {
        return false; // Macaco precisa de pelo menos outro animal
      }
      if (animalInfo.bioma.includes('savana') && recinto.animais.hipopotamos && !recinto.bioma.includes('savana e rio')) {
        return false; // Hipopótamo só tolera outras espécies em savana e rio
      }
    }

    return true;
  }

  calculaEspacoNecessario(recinto, animalInfo, quantidade) {
    let espacoNecessario = quantidade * animalInfo.tamanho;

    // Adiciona espaço extra se houver mais de uma espécie
    if (Object.keys(recinto.animais).length > 0 && animalInfo.bioma !== 'floresta') {
      espacoNecessario += 1;
    }

    return espacoNecessario;
  }

  calculaEspacoOcupado(recinto, animalInfo, quantidade) {
    const espacoNecessario = this.calculaEspacoNecessario(recinto, animalInfo, quantidade);
    return espacoNecessario;
  }
}
