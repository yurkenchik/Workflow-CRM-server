import {HttpException, HttpStatus} from "@nestjs/common";

export class CodesDontMatchException extends HttpException {
    constructor() {
        super("Codes don`t match", HttpStatus.BAD_REQUEST);
    }
}