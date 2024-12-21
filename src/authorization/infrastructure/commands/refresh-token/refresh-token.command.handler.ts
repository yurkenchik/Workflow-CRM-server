import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RefreshTokenCommand } from "src/authorization/infrastructure/commands/refresh-token/refresh-token.command";
import { TokenService } from "src/authorization/infrastructure/services/token.service";
import { AuthorizationResponseDto } from "src/authorization/domain/dto/authorization-response.dto";

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
    implements ICommandHandler<RefreshTokenCommand>
{
    constructor(private readonly tokenService: TokenService) {}

    async execute(command: RefreshTokenCommand): Promise<AuthorizationResponseDto> {
        return this.tokenService.refreshToken(command.refreshTokenDto);
    }
}