export const createTeam = (teamId: string, team: string, brand: number) => {
    return `mutation MyMutation {
        createMetaScoringCompetition(input: {board: "", brand: ${brand}, draw: 1, final: "", lose: 1, quarter: "", round_16: "", round_32: "", semi: "", team: "${team}", team_id: "${teamId}", win: 1}) {
            board
            brand
            draw
            final
            lose
            quarter
            round_16
            round_32
            semi
            team_id
            team
            win
        }
    }
`
}



export const queryTeams = `
query MyQuery {
  listMegatonCompetitionTeamTables(limit: 40)  {
    items {
      board
      brand
      draw
      lose
      score
      team
      team_id
      win
    }
  }
}
`;

export const queryTeamByCategory = (category: string) => {
    return `
query MyQuery {
  listMegatonCompetitionTeamTables(filter: {board: {contains: "${category}"}}, limit: 500)  {
    items {
      board
      brand
      draw
      lose
      score
      team
      team_id
      win
    }
  }
}
`
}

export const queryAllTeams = `
query MyQuery {
  listMetaScoringCompetitions {
    items {
      board
      brand
      draw
      final
      lose
      quarter
      round_16
      round_32
      semi
      team
      team_id
      win
    }
  }
}
`

export const getRacingTeams = (board: string) => {
     return `
        query MyQuery {
          listRacingTeams(filter: {category: {eq: "${board}"}}, limit: 500) {
            items {
              team_id
              team
              round2
              round1
              category
              brand
            }
          }
        }
     `
}

