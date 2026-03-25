import express from 'express';
import { getCalendarHandler, getNextRaceHandler } from './controllers/calendarController.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar parser para JSON si fuera necesario luego
app.use(express.json());

// Main Routes
app.get('/api/calendar/next', getNextRaceHandler);
app.get('/api/calendar/:year', getCalendarHandler);

app.listen(PORT, () => {
  console.log(`🚀 Full Wet - Backend Express corriendo en http://localhost:${PORT}`);
});