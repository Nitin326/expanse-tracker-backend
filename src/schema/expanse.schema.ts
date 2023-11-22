import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { now, Document } from "mongoose";
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

export type ExpanseDocument = Expanse & Document;

@Schema()
export class Expanse {
    @Prop()
    amount: number;

    @Prop()
    description: string;

    @Prop()
    category: string;

    @Prop()
    date: string;

    @Prop()
    mode: string;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: string;
}

export const ExpanseSchema = SchemaFactory.createForClass(Expanse);