import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExpanseDocument } from 'src/schema/expanse.schema';
import { UserDocument } from 'src/schema/user.schema';

@Injectable()
export class DashboardService {

    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,
        @InjectModel('Expanse') private readonly expanseModel: Model<ExpanseDocument>) { }

    async getProfile(userId: string) {
        const profile = await this.userModel.findById(userId);
        return {
            status: 200,
            message: 'This is User Profile',
            data: profile
        }
    }

    async findByMonth(userId: string, date: string) {
        const [day, month, year] = date.split('-');
        const dateObject = new Date(`${year}-${month}-${day}`);

        const extractedMonth = dateObject.getMonth() + 1; // Months are zero-based, so add 1
        const extractedYear = dateObject.getFullYear();

        const allFilter = {
            author: userId,
            createdAt: {
                $gte: new Date(extractedYear, extractedMonth - 1, 1), // Start of the month
                $lt: new Date(extractedYear, extractedMonth, 1), // Start of the next month
            },
        };

        // food Filter
        const foodFilter = {
            author: userId,
            category: 'Food',
            createdAt: {
                $gte: new Date(extractedYear, extractedMonth - 1, 1), // Start of the month
                $lt: new Date(extractedYear, extractedMonth, 1), // Start of the next month
            },
        };

        // Fun filter
        const funFilter = {
            author: userId,
            category: 'Entertainment',
            createdAt: {
                $gte: new Date(extractedYear, extractedMonth - 1, 1), // Start of the month
                $lt: new Date(extractedYear, extractedMonth, 1), // Start of the next month
            },
        };

        // Travel filter
        const travelFilter = {
            author: userId,
            category: 'Transportation',
            createdAt: {
                $gte: new Date(extractedYear, extractedMonth - 1, 1), // Start of the month
                $lt: new Date(extractedYear, extractedMonth, 1), // Start of the next month
            },
        };

        // lifeStyle filter
        const styleFilter = {
            author: userId,
            category: 'lifeStyle',
            createdAt: {
                $gte: new Date(extractedYear, extractedMonth - 1, 1), // Start of the month
                $lt: new Date(extractedYear, extractedMonth, 1), // Start of the next month
            },
        };

        // Other filter
        const otherFilter = {
            author: userId,
            category: 'Other',
            createdAt: {
                $gte: new Date(extractedYear, extractedMonth - 1, 1), // Start of the month
                $lt: new Date(extractedYear, extractedMonth, 1), // Start of the next month
            },
        };

        try {
            const expanseDetails = await this.expanseModel.find(allFilter);
            const foodDetails = await this.expanseModel.find(foodFilter);
            const funDetails = await this.expanseModel.find(funFilter);
            const travelDetails = await this.expanseModel.find(travelFilter);
            const styleDetails = await this.expanseModel.find(styleFilter);
            const otherDetails = await this.expanseModel.find(otherFilter);

            const totalAmount = expanseDetails.reduce((sum, item) => sum + item.amount, 0);
            const foodAmount = foodDetails.reduce((sum, item) => sum + item.amount, 0);
            const funAmount = funDetails.reduce((sum, item) => sum + item.amount, 0);
            const travelAmount = travelDetails.reduce((sum, item) => sum + item.amount, 0);
            const styleAmount = styleDetails.reduce((sum, item) => sum + item.amount, 0);
            const otherAmount = otherDetails.reduce((sum, item) => sum + item.amount, 0);



            return {
                status: 200,
                message: 'This is Monthly Expanse Details',
                expanse: {
                    totalAmount: totalAmount,
                    foodAmount: foodAmount,
                    funAmount: funAmount,
                    travelAmount: travelAmount,
                    styleAmount: styleAmount,
                    otherAmount: otherAmount
                }
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Internal Server Error',
                data: null,
            };
        }
    }






}
