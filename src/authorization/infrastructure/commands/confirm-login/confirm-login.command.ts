import {ConfirmAuthorizationDto} from "src/authorization/domain/dto/confirm-authorization.dto";

export class ConfirmLoginCommand {
    constructor(public readonly confirmAuthorizationDto: ConfirmAuthorizationDto) {}
}