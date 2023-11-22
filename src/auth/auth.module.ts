import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '1d' }, // e.g. 30s, 7d, 24h
    }),
  ],
  controllers: [],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}