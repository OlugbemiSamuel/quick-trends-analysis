export interface BallDontLieTeam {
  id: number;
  full_name: string;
  abbreviation: string;
}

export interface BallDontLieGame {
  id: string;
  home_team: BallDontLieTeam;
  visitor_team: BallDontLieTeam;
  home_team_score: number;
  visitor_team_score: number;
  home_q1: number;
  home_q2: number;
  home_q3: number;
  home_q4: number;
  home_ot1: number;
  home_ot2: number;
  home_ot3: number;
  visitor_q1: number;
  visitor_q2: number;
  visitor_q3: number;
  visitor_q4: number;
  visitor_ot1: number;
  visitor_ot2: number;
  visitor_ot3: number;
  date: string;
  season: number;
  status: string;
}

export interface BallDontLieTeamsResponse {
  data: BallDontLieTeam[];
}
