import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ExpanseService } from './expanse.service';
import { ExpanseDto, UpdateExpanseDto } from './dto/expanse.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('expanse')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Exapnse')
export class ExpanseController {
  constructor(private readonly expanseService: ExpanseService) {}

  @Post()
  create(@Body() expanseDto: ExpanseDto, @Req() req: Request) {
    const user: any = req.body;
    const userId = user.userId;
    try {
      return this.expanseService.create(expanseDto, userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @ApiQuery({ name: 'food', required: false, type: String })
  @ApiQuery({ name: 'travel', required: false, type: String })
  @ApiQuery({ name: 'fun', required: false, type: String })
  @ApiQuery({ name: 'lifeStyle', required: false, type: String })
  @ApiQuery({ name: 'other', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  findAll(@Req() req: Request,@Query('food') Food: string, @Query('travel') Transportation: string,@Query('fun') Entertainment: string,@Query('lifeStyle') lifestyle: string,@Query('other') other: string,@Query('page') page: number) {
    const user: any = req.body;
    const userId = user.userId;
    try {
      return this.expanseService.findAll(userId,Food,Transportation,Entertainment,lifestyle,other,page);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get("/:id")
  findOne(@Param('id') id : string ,@Req() req: Request) {
    const user: any = req.body;
    const userId = user.userId;
    try {
      return this.expanseService.findOne(id,userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Patch("/:id")
  update(@Param('id') id : string,@Req() req: Request, @Body() updateExpanseDto: UpdateExpanseDto) {
    const user: any = req.body;
    const userId = user.userId;
    try {
      return this.expanseService.update(id,userId,updateExpanseDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete('/:id')
  remove(@Param('id') id : string,@Req() req: Request) {
    const user: any = req.body;
    const userId = user.userId;
    return this.expanseService.remove(id,userId);
  }
}
