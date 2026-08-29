export interface Team {
    id: number;
    name:string;
    shortName: string;
};


export interface Game {
    id: string; 
    homeTeam: Team;
    awayTeam: Team;
    homeScore: number;
    awayScore: number;
    homePeriods: {
        q1: number,
        q2: number,
        q3: number,
        q4: number,  
        ot1: number | null,
        ot2: number| null,
        ot3:number | null,
    };
    awayPeriods: {
        q1: number,
        q2: number,
        q3: number,
        q4: number,  
        ot1: number | null,
        ot2: number| null,
        ot3:number | null,
    };
    date: string;
    season: number;
    status: string;
}

export interface TeamGamesQuery {
    teamId: number;
    season: number;
    limit: number;
}