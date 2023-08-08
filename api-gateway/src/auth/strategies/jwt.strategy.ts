import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from "../constant";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly _configService: ConfigService) {
        const jwt_secret = _configService.get('JWT_SECRET');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwt_secret
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}