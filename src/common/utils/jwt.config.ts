import {ConfigService} from "@nestjs/config";

export const jwtConfig = (configService: ConfigService) => {
    return {
        secretKey: configService.get<string>('JWT_SECRET_KEY') || 'secret',
        signOptions: {
            expiresIn: "336h"
        }
    };
};