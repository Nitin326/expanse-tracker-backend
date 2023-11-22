import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService : JwtService){}

    genrateToken(payload:object){
      return this.jwtService.sign(payload);
    }

    decodeToken(payload:any){
        return this.jwtService.decode(payload);
    }

}
