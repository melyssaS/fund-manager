import { Request, Response } from 'express';
import Fund from '../schemas/fund.schema';
import OpenFund from '../schemas/open-fund.schema';

export const allFunds = async (req: Request, res: Response) => {
    try {
        const funds = await Fund.find();
         res.json(funds); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los fondos', error });
    }
}

export const avalaibleFunds = async (req: Request, res: Response) => {
    try {
        const openFundIds = await OpenFund.find().distinct('fundId');
        const availableFunds = await Fund.find({
            _id: { $nin: openFundIds }
        });
         res.json(availableFunds); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los fondos', error });
    }
}