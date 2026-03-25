import type { Request, Response } from 'express';
import { getCalendar, getNextRace } from '../services/calendarService.js';

export const getCalendarHandler = async (req: Request, res: Response) => {
  try {
    const yearString = req.params.year;
    
    if (!yearString) {
      res.status(400).json({ error: 'El parámetro de año es requerido.' });
      return;
    }

    const year = parseInt(yearString as string, 10);
    
    if (isNaN(year)) {
      res.status(400).json({ error: 'El año provisto no es válido.' });
      return;
    }

    const calendar = await getCalendar(year);
    res.json(calendar);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener el calendario.' });
  }
};

export const getNextRaceHandler = async (req: Request, res: Response) => {
  try {
    const nextRace = await getNextRace();
    if (!nextRace) {
      res.status(404).json({ message: 'No hay próximas carreras programadas.' });
      return;
    }
    res.json(nextRace);
  } catch (error) {
    console.error('Error fetching next race:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener la próxima carrera.' });
  }
};
