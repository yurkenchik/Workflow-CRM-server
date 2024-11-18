import {ApiProperty} from "@nestjs/swagger";

export class AuthorizationResponseDto {
    @ApiProperty()
    readonly accessToken: string;
    @ApiProperty()
    readonly refreshToken: string;
}