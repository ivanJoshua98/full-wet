import express from 'express';
import { getCalendarHandler, getNextRaceHandler } from './controllers/calendarController.js';
import { getAllSeasonsHandler } from './controllers/seasonsController.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Calendar Routes
app.get('/api/calendar/next', getNextRaceHandler);
app.get('/api/calendar/:year', getCalendarHandler);

// Seasons Routes
app.get('/api/seasons', getAllSeasonsHandler);

app.listen(PORT, () => {
  console.log(`🚀 Full Wet - Backend Express corriendo en http://localhost:${PORT}`);
});