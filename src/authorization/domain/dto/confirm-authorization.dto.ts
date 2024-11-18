import {ApiProperty} from "@nestjs/swagger";

export class ConfirmAuthorizationDto {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly confirmationCode: string;
}