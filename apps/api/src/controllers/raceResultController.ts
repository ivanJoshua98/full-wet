import { getRaceResults } from '../services/raceResultService.js';
import type { Request, Response } from 'express';

export async function getRaceResultsHandler(req: Request, res: Response) {
    try {
      const { raceId } = req.params;
      if (!raceId) {
          return res.status(400).json({ error: 'Race id is required' });
      }
      const id = parseInt(raceId as string);
      if (isNaN(id)) {
          return res.status(400).json({ error: 'Race id must be a number' });
      }
      const raceResult = await getRaceResults(id);
      if (!raceResult) {
          return res.status(404).json({ error: 'Race result with id ' + id + ' not found' });
      }
      res.json(raceResult);
    } catch (error) {
      console.error('Error fetching race result:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}