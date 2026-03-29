import express from 'express';
import { createConstructorStandingRouter } from './routes/constructorStanding.js';
import { createDriverStandingRouter } from './routes/driverStanding.js';
import { createRaceRouter } from './routes/race.js';
import { createRaceResultRouter } from './routes/raceResult.js';
import { createSeasonRouter } from './routes/season.js';

const app = express();
const PORT = process.env.API_PORT || 3000;

// Configuraciones globales
app.disable('x-powered-by');
app.use(express.json());

// Endpoints
app.use('/api/races', createRaceRouter());
app.use('/api/seasons', createSeasonRouter());
app.use('/api/race-results', createRaceResultRouter());
app.use('/api/driver-standings', createDriverStandingRouter());
app.use('/api/constructor-standings', createConstructorStandingRouter());

app.listen(PORT, () => {
  console.log(`🚀 Full Wet - Backend Express corriendo en http://localhost:${PORT}`);
});