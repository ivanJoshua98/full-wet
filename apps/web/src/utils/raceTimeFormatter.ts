import type { models } from "types";

export function showTimeResult(result: models.RaceResult, firstDriver: models.RaceResult) {
    if (result.status === 'Finished') {
        return result.time;
    }
    if (result.status === 'Retired') {
        return 'DNF';
    }
    if (result.status === 'DSQ') {
        return 'DSQ';
    }
    if (result.status === 'Did not start') {
        return 'DNS';
    }
    if (result.status === 'Lapped') {
        return calculateLapsDifference(result, firstDriver);
    }
    return '---';
}

function calculateLapsDifference(result: models.RaceResult, firstDriver: models.RaceResult) {
    if (firstDriver.laps === null || result.laps === null) {
        return '---';
    }
    const difference = firstDriver.laps - result.laps;
    const description = difference === 1 ? 'lap' : 'laps';
    return `+${difference} ${description}`;
}