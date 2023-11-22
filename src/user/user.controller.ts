import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  craeteUser(@Body() userDto: CreateUserDto) {
    try {
      const response = this.userService.createUser(userDto);
      return response;
    } catch (err) {
      throw new InternalServerErrorException({message:err.message});
    }
  }

  @Post('/login')
  loginUser(@Body() loginDto: LoginUserDto) {
    try {
      const response = this.userService.loginUser(loginDto);
      return response;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Post('/password-reset')
  PasswordReset() {
    try {
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
