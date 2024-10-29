import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import {UserService} from "../../../application/services/user.service";
import { v4 as uuidv4 } from "uuid";
import {Email} from "../../../domain/value-objects/email";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            clientID: configService.getOrThrow('GOOGLE_AUTH_CLIENT_ID'),
            clientSecret: configService.getOrThrow('GOOGLE_AUTH_CLIENT_SECRET'),
            callbackURL: configService.getOrThrow('GOOGLE_AUTH_REDIRECT_URI'),
            scope: ['profile', 'email'],
        });
    }

    async validate(_accessToken: string, _refreshToken: string, profile: any) {
        const email = profile.emails[0]?.value;
        const emailValueObject = new Email(email);

        let user = await this.userService.findUserByEmail(emailValueObject);

        if (!user) {
            user = await this.userService.createUser({
                email: emailValueObject.getValue(),
                username: profile.displayName || '',
                password: '',
                phoneNumber: '',
                companyName: ''
            });
        }
        return user;
    }
}