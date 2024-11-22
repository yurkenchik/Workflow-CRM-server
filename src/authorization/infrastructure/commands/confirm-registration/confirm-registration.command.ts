import { ConfirmAuthorizationDto } from "src/authorization/domain/dto/confirm-authorization.dto";

export class ConfirmRegistrationCommand {
    constructor(public readonly confirmAuthorizationDto: ConfirmAuthorizationDto) {}
}