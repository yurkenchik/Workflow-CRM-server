import { ApiProperty } from "@nestjs/swagger";

export class CreateMemberDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly avatarImageUrl: string;
}