import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    readonly email: string;
    @ApiProperty()
    @IsOptional()
    readonly phoneNumber: string;
    @ApiProperty()
    @IsOptional()
    readonly password: string;
}