import { Document } from 'mongoose';


export interface IBalance extends Document {
    amount: number;
    updateAt: Date;
}