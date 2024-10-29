import {HttpException, HttpStatus} from "@nestjs/common";

export class InvalidPasswordException extends HttpException {
    constructor() {
        super("Password not valid", HttpStatus.BAD_REQUEST);
    }
}