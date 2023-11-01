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

export const updateTeamBoard = (team_id: string, board: string) => {
    return `
mutation MyMutation {
  updateMetaScoringCompetition(input: {team_id: "${team_id}", board: "${board}"}) {
    team_id
  }
}
`
}


export const queryTeams = `
query MyQuery {
  listMegatonCompetitionTeams {
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

