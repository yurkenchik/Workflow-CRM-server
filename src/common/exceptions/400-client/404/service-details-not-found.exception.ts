import { HttpException, HttpStatus } from "@nestjs/common";

export class ServiceDetailsNotFoundException extends HttpException {
    constructor() {
        super("Service details not found", HttpStatus.NOT_FOUND);
    }
}