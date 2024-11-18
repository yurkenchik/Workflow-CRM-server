import {HttpException, HttpStatus} from "@nestjs/common";

export class EntityManagerNotFoundException extends HttpException {
    constructor() {
        super("Entity manager not found", HttpStatus.NOT_FOUND);
    }
}