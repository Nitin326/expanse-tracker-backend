import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpanseService } from './expanse.service';
import { ExpanseController } from './expanse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpanseSchema } from '../schema/expanse.schema';
import { UserSchema } from 'src/schema/user.schema';
import { ExpanseMiddleware } from 'src/auth/middlwware/expanse.middlware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule,MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{ name: 'Expanse', schema: ExpanseSchema }])],
  controllers: [ExpanseController],
  providers: [ExpanseService],
})

export class ExpanseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExpanseMiddleware)
      .forRoutes('expanse');
  }
}
