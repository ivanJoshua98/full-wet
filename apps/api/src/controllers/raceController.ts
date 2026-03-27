import { getNextRace, getRacesByYear, getAllRaces } from '../services/raceService.js';
import type { Request, Response } from 'express';

export const getRacesByYearHandler = async (req: Request, res: Response) => {
  try {
    const yearString = req.params.year;
    
    if (!yearString) {
      res.status(400).json({ error: 'Year is required.' });
      return;
    }

    const year = parseInt(yearString as string, 10);
    
    if (isNaN(year)) {
      res.status(400).json({ error: 'Invalid year provided.' });
      return;
    }

    const races = await getRacesByYear(year);
    res.json(races);
  } catch (error) {
    console.error('Error fetching races by year:', error);
    res.status(500).json({ error: 'Internal server error while fetching races by year.' });
  }
};

export const getNextRaceHandler = async (req: Request, res: Response) => {
  try {
    const yearString = req.params.year;
    
    if (!yearString) {
      res.status(400).json({ error: 'Year is required.' });
      return;
    }

    const year = parseInt(yearString as string, 10);
    
    if (isNaN(year)) {
      res.status(400).json({ error: 'Invalid year provided.' });
      return;
    }

    const nextRace = await getNextRace(year);
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

export const getAllRacesHandler = async (req: Request, res: Response) => {
  try {
    const races = await getAllRaces();
    res.json(races);
  } catch (error) {
    console.error('Error fetching races:', error);
    res.status(500).json({ error: 'Internal server error while fetching races.' });
  }
};

