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
    }
}