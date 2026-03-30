import type { Request, Response } from 'express';
import { getAllOnThisDay, getOnThisDayByDate } from '../services/onThisDayService.js';

export const getAllOnThisDayHandler = async (req: Request, res: Response) => {
    try {
        const allOnThisDay = await getAllOnThisDay();
        res.json(allOnThisDay);
    } catch (error) {
        console.error('Error fetching all on this day:', error);
        res.status(500).json({ error: 'Internal server error to get all on this day.' });
    }
};

export const getOnThisDayByDateHandler = async (req: Request, res: Response) => {
    try {
        const { day, month } = req.params;
        const onThisDay = await getOnThisDayByDate(Number(day), Number(month));
        if (!onThisDay) {
            return res.status(404).json({ error: `On this day not found for the given date: ${day}/${month}` });
        }
        res.json(onThisDay);
    } catch (error) {
        console.error('Error fetching on this day by date:', error);
        res.status(500).json({ error: 'Internal server error to get on this day by date.' });
    }
};
