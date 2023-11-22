import { Controller, Get, InternalServerErrorException, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Dashboard')
export class DashboardController {

    constructor(private readonly dashboadService: DashboardService,){}

    @Get('/profile')
    getProfile(@Req() req: Request){
    const user: any = req.body;
    const userId = user.userId;
    return this.dashboadService.getProfile(userId);
    }

    @Get('/month')
    @ApiQuery({ name: 'date', required: false, type: String })
    findByMonth(@Req() req: Request,@Query('date') date: string) {
        const user: any = req.body;
        const userId = user.userId;
        try {
          return this.dashboadService.findByMonth(userId,date);
        } catch (error) {
          throw new InternalServerErrorException();
        }
      }
}

