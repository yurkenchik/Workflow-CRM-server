import {HttpException, HttpStatus} from "@nestjs/common";

export class PasswordsDontMatchException extends HttpException {
    constructor() {
        super("Passwords do not match", HttpStatus.BAD_REQUEST);
    }
}