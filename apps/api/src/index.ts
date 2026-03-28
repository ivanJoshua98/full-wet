import express from 'express';
import { getAllSeasonsHandler } from './controllers/seasonsController.js';
import { getNextRaceHandler, getRacesByYearHandler, getAllRacesHandler } from './controllers/raceController.js';
import { getRaceResultsHandler } from './controllers/raceResultController.js';
import { getDriverStandingsHandler } from './controllers/driverStandingController.js';
import { getConstructorStandingsHandler } from './controllers/constructorStandingController.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Calendar Routes
app.get('/api/:year/races/next', getNextRaceHandler);
app.get('/api/:year/races', getRacesByYearHandler);

// Seasons Routes
app.get('/api/seasons', getAllSeasonsHandler);

// Race Routes
app.get('/api/races', getAllRacesHandler);

// Race results Routes
app.get('/api/races/:raceId/results', getRaceResultsHandler);

// Driver standings Routes
app.get('/api/:year/driver-standings', getDriverStandingsHandler);

// Constructor standings Routes
app.get('/api/:year/constructor-standings', getConstructorStandingsHandler);

app.listen(PORT, () => {
  console.log(`🚀 Full Wet - Backend Express corriendo en http://localhost:${PORT}`);
});