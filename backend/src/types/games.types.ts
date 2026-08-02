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
        ot1: number,
        ot2: number,
        ot3:number,
    };
    awayPeriods: {
        q1: number,
        q2: number,
        q3: number,
        q4: number,  
        ot1: number,
        ot2: number,
        ot3:number,
    };
    date: string;
    season: number;
    status: string;
}