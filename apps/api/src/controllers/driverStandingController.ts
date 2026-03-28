import type { Request, Response } from 'express';
import { getDriverStandingsByYear } from '../services/driverStandingService.js';

export const getDriverStandingsHandler = async (req: Request, res: Response) => {
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
    const driverStandings = await getDriverStandingsByYear(year);
    res.json(driverStandings);
  } catch (error) {
    console.error('Error fetching driver standings:', error);
    res.status(500).json({ error: 'Internal server error while fetching driver standings.' });
  }
};
