import { RefreshTokenDto } from "src/authorization/domain/dto/refresh-token.dto";

export class RefreshTokenCommand {
    constructor(public readonly refreshTokenDto: RefreshTokenDto) {}
}