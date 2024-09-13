// recintos-zoo.js
export class RecintosZoo {
    analisaRecintos(animal, quantidade) {
      const animaisValidos = ['MACACO', 'CROCODILO'];
      const recintos = [
        { id: 1, capacidade: 10 },
        { id: 2, capacidade: 5 },
        { id: 3, capacidade: 7 },
        { id: 4, capacidade: 8 },
      ];
  
      // Verificar se o animal é válido
      if (!animaisValidos.includes(animal)) {
        return { erro: "Animal inválido", recintosViaveis: [] };
      }
  
      // Verificar se a quantidade é válida
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida", recintosViaveis: [] };
      }
  
      // Filtrar recintos que podem acomodar a quantidade de animais (agora estritamente maior que a quantidade)
      const recintosViaveis = recintos
        .filter(recinto => recinto.capacidade > quantidade) // Só considerar recintos com capacidade maior
        .map(recinto => ({
          descricao: `Recinto ${recinto.id} (espaço livre: ${recinto.capacidade - quantidade} total: ${recinto.capacidade})`,
          espacoLivre: recinto.capacidade - quantidade,
        }))
        .sort((a, b) => b.espacoLivre - a.espacoLivre) // Ordenar pelo espaço livre, do maior para o menor
        .map(recinto => recinto.descricao);
  
      // Verificar se há recintos viáveis
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável", recintosViaveis: [] };
      }
  
      // Se for CROCODILO e há múltiplos recintos viáveis, retorna apenas o recinto com mais espaço livre
      if (animal === 'CROCODILO' && recintosViaveis.length > 1) {
        return { erro: null, recintosViaveis: [recintosViaveis[0]] };
      }
  
      // Retornar recintos viáveis para outros casos
      return { erro: null, recintosViaveis };
    }
  }
  