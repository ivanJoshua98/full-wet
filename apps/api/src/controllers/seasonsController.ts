import type { Request, Response } from 'express';
import { getAllSeasons } from '../services/seasonsService.js';

export const getAllSeasonsHandler = async (req: Request, res: Response) => {
  try {
    const seasons = await getAllSeasons();
    res.json(seasons);
  } catch (error) {
    console.error('Error fetching seasons:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener las temporadas.' });
  }
};