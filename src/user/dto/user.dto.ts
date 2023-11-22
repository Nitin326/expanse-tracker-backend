import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}


class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export {CreateUserDto,LoginUserDto}