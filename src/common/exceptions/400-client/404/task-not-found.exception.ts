import { HttpException, HttpStatus } from "@nestjs/common";

export class TaskNotFoundException extends HttpException {
    constructor() {
        super("Task not found", HttpStatus.NOT_FOUND);
    }
}