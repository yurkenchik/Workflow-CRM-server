import {HttpException, HttpStatus} from "@nestjs/common";

export class ConfirmationCodeNotFoundException extends HttpException {
    constructor() {
        super("Confirmation code not found", HttpStatus.NOT_FOUND);
    }
}