import {HttpException, HttpStatus} from "@nestjs/common";

export class InvalidPasswordException extends HttpException {
    constructor() {
        super("Invalid password format", HttpStatus.BAD_REQUEST);
    }
}