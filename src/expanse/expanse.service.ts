import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExpanseDto, UpdateExpanseDto } from './dto/expanse.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExpanseDocument } from 'src/schema/expanse.schema';
import { UserDocument } from 'src/schema/user.schema';

@Injectable()
export class ExpanseService {
  constructor(
    @InjectModel('Expanse') private readonly expanseModel: Model<ExpanseDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) { }

  async create(expanseDto: ExpanseDto, id: string) {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        return { status: 404, message: 'User not found' };
      }
      const expense = await this.expanseModel.create({
        ...expanseDto,
        author: user._id.toString(),
      });

      return {
        status: 201,
        message: 'Expanse added successfully',
        data: expense,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(userId: string, food: string, travel: string, fun: string, lifeStyle: string, other: string,page:number) {
    try {
      // Build a filter object based on provided category parameters
      const categoryFilter: { category?: string } = {};

      const pageSize = 10;

      if (food) {
        categoryFilter.category = 'food';
      } else if (travel) {
        categoryFilter.category = 'travel';
      } else if (fun) {
        categoryFilter.category = 'fun';
      } else if (lifeStyle) {
        categoryFilter.category = 'lifeStyle';
      } else if (other) {
        categoryFilter.category = 'other';
      }

      // Add the author condition to the filter
      const filter = { ...categoryFilter, author: userId };

      const skip = (page - 1) * pageSize;

      const expenses = await this.expanseModel.find(filter).skip(skip).limit(pageSize);

      return {
        status: 200,
        message: 'Expense listed successfully',
        data: expenses,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const expanse = await this.expanseModel.findById(id);
      if (!expanse) {
        return { status: 404, message: 'Expanse not found' };
      }
      if (userId != expanse.author) {
        throw new UnauthorizedException();
      }
      return { status: 200, message: 'Your Expanse', data: expanse };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, userId: string, updateExpanseDto: UpdateExpanseDto) {
    try {
      const expanse = await this.expanseModel.findByIdAndUpdate(id, updateExpanseDto, { new: true });
      if (!expanse) {
        throw new NotFoundException(`Expanse not found`);
      }
      if (userId != expanse.author) {
        throw new UnauthorizedException();
      }
      return { status: 200, message: 'Your Expanse updated', data: expanse };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string, userId: string) {
    try {
      const expanse = await this.expanseModel.findByIdAndDelete(id);
      if (!expanse) {
        return { status: 404, message: 'Expanse not found' };
      }
      if (userId != expanse.author) {
        throw new UnauthorizedException();
      }
      return {
        status: 200,
        message: 'Expanse Deleted successfully',
        data: expanse,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
