export const queryMatchByTable = (table: number) => {
    return `
        query MyQuery {
          listMegatonMatches(filter: {table: {eq: ${table + 1}}}) {
            items {
              board
              brand1
              brand2
              live
              match_id
              score1
              score2
              table
              team1
              team2
            }
          }
        }
    `
}

export const getAllMatches = `
query MyQuery {
  listMegatonMatches {
    items {
      board
      brand1
      brand2
      live
      match_id
      score1
      score2
      table
      team1
      team2
    }
  }
}
`;

export const queryMatchByBoard = (board: string) => {
    return `
    query MyQuery {
      listMegatonMatches(limit: 200, filter: {board: {eq: "${board}"}}) {
        items {
          board
          brand1
          brand2
          live
          match_id
          score1
          score2
          table
          team1
          team2
        }
      }
    }
    `
};

export const createMatch = (board: string, brand1: number, brand2: number, live: number, match_id: string, score1: number, score2: number, table: number, team1: string, team2: string) => {
    return `
    mutation MyMutation {
      createMegatonMatch(input: {board: "${board}", brand1: ${brand1}, brand2: ${brand2}, live: ${live}, match_id: "${match_id}", score1: ${score1}, score2: ${score2}, table: ${table}, team1: "${team1}", team2: "${team2}"}) {
        board
        brand1
        brand2
        live
        match_id
        score1
        score2
        table
        team1
        team2
      }
    }
    `
};

export const getIsMatchSetting = (category: string) => {
    return `
    query MyQuery {
      listMegatonMatches(filter: {board: {contains: "${category}"}}) {
        items {
          match_id
          team1
          team2
        }
      }
    }
    `
}
