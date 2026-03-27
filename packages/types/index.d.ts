export namespace models {
    export interface Race {
        id: string;
        seasonYear: number;
        round: number;
        name: string;
        date: Date;
        circuitId: string;
        sprint: Date | null;
        firstPractice: Date | null;
        secondPractice: Date | null;
        thirdPractice: Date | null;
        qualifying: Date | null;
        circuit: Circuit;
    }

    export interface Circuit {
        id: string;
        name: string;
        location: string;
        country: string;
        length: number | null;
        record: string | null;
    }

    export interface RaceResult {
        id: string;
        raceId: string;
        driverId: string;
        teamId: string;
        position: number | null;
        points: number;
        fastestLap: string | null;
        driver: Driver;
        team: Team;
        grid: number | null;
        status: string | null;
        laps: number | null;
        time: string | null;
    }

    export interface Driver {
        id: string;
        name: string;
        number: number | null;
        nationality: string | null;
        teamId: string | null;
    }

    export interface Team {
        id: string;
        name: string;
        country: string;
    }

    export interface RaceResultTable {
        race: Race;
        results: RaceResult[];
    }
}