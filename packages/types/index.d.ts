export namespace models {
    export interface Race {
        id: number;
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
        circuit?: Circuit;
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
        id: number;
        raceId: number;
        driverId: string;
        teamId: string;
        position: number | null;
        points: number;
        fastestLap: boolean | null;
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
        base: string | null;
    }

    export interface RaceResultTable {
        race: Race;
        results: RaceResult[];
    }

    export interface DriverStanding {
        id: number;
        seasonYear: number;
        driverId: string;
        position: number;
        points: number;
        wins: number;
        driver: Driver;
        teamName: string;
    }

    export interface ConstructorStanding {
        id: number;
        seasonYear: number;
        teamId: string;
        position: number;
        points: number;
        wins: number;
        team: Team;
    }

    export interface OnThisDay {
        id: number;
        day: number;
        month: number;
        history: string;
        createdAt: Date;
    }
}