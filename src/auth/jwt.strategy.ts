import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ExtractJwt } from 'passport-jwt';
import config from "src/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.secretKey,
        });
    }

    validate(payload: any) {
        return {
            userId: payload.sub,
            username: payload.username
        };
    }
}
