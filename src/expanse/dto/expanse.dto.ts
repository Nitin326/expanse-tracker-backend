import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


class ExpanseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mode: string;
}

class UpdateExpanseDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  date: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mode: string;
}

export { ExpanseDto, UpdateExpanseDto };
