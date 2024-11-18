import {ApiProperty} from "@nestjs/swagger";

export class GenerateConfirmationCodeDto {
    @ApiProperty()
    readonly value: string;
}