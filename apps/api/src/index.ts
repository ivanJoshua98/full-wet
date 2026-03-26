import express from 'express';
import { getAllSeasonsHandler } from './controllers/seasonsController.js';
import { getNextRaceHandler, getRacesByYearHandler } from './controllers/raceController.js';
import { getRaceResultsHandler } from './controllers/raceResultController.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Calendar Routes
app.get('/api/:year/races/next', getNextRaceHandler);
app.get('/api/:year/races', getRacesByYearHandler);

// Seasons Routes
app.get('/api/seasons', getAllSeasonsHandler);

// Race results Routes
app.get('/api/races/:raceId/results', getRaceResultsHandler);

app.listen(PORT, () => {
  console.log(`🚀 Full Wet - Backend Express corriendo en http://localhost:${PORT}`);
});