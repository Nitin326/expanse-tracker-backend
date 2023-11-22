import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService
  ) { }

  async createUser(userDto: CreateUserDto) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds);
      userDto.password = hashedPassword;
      const response = this.userModel.create(userDto);
      return { status: 201, message:'Account Created Successfully', data:response};
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async loginUser(loginDto: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({phone:loginDto.phone});

      if (!user) {
        throw new NotFoundException();
      }

      const isMatch = await bcrypt.compare(loginDto.password, user.password);

      if(!isMatch) {
        throw new InternalServerErrorException("Invalid Password");
      }

      const payload = {
        id: user.id,
        first_name: user.fname,
        last_name: user.lname,
        phone: user.phone,
        email: user.email
      };

      const token = this.authService.genrateToken(payload);
      return { status: 200, message:'Login Successfully', token:token};

    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
