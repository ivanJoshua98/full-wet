import type { Request, Response } from 'express';
import { getConstructorStandingsByYear } from '../services/constructorStandingService.js';

export const getConstructorStandingsHandler = async (req: Request, res: Response) => {
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
    const constructorStandings = await getConstructorStandingsByYear(year);
    res.json(constructorStandings);
  } catch (error) {
    console.error('Error fetching constructor standings:', error);
    res.status(500).json({ error: 'Internal server error while fetching constructor standings.' });
  }
};
