export const teamChangeDetection = `
subscription MySubscription {
  onUpdateMegatonCompetitionTeamTable {
    team_id
  }
}
`

export const racingTeamsChangeDetection = `
    subscription MySubscription {
      onUpdateRacingTeam {
        team_id
      }
    }
`
