import type {
  BallDontLieGame,
  BallDontLieTeam,
} from "../types/ballDontLie.types.js";
import type { Game, Team } from "../types/games.types.js";

export const mapApiToGame = (apiGame: BallDontLieGame): Game => {
  return {
    id: apiGame.id,
    date: apiGame.date,
    season: apiGame.season,
    status: apiGame.status,
    homeTeam: {
      id: apiGame.home_team.id,
      name: apiGame.home_team.full_name,
      shortName: apiGame.home_team.abbreviation,
    },
    awayTeam: {
      id: apiGame.visitor_team.id,
      name: apiGame.visitor_team.full_name,
      shortName: apiGame.visitor_team.abbreviation,
    },
    homeScore: apiGame.home_team_score,
    awayScore: apiGame.visitor_team_score,
    homePeriods: {
      q1: apiGame.home_q1,
      q2: apiGame.home_q2,
      q3: apiGame.home_q3,
      q4: apiGame.home_q4,
      ot1: apiGame.home_ot1,
      ot2: apiGame.home_ot2,
      ot3: apiGame.home_ot3,
    },
    awayPeriods: {
      q1: apiGame.visitor_q1,
      q2: apiGame.visitor_q2,
      q3: apiGame.visitor_q3,
      q4: apiGame.visitor_q4,
      ot1: apiGame.visitor_ot1,
      ot2: apiGame.visitor_ot2,
      ot3: apiGame.visitor_ot3,
    },
  };
};

export const mapApiToTeam = (apiTeam: BallDontLieTeam): Team => {
  return {
    id: apiTeam.id,
    name: apiTeam.full_name,
    shortName: apiTeam.abbreviation,
  };
};
