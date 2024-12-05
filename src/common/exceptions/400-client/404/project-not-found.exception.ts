import { HttpException, HttpStatus } from "@nestjs/common";

export class ProjectNotFoundException extends HttpException {
    constructor() {
        super("Project not found", HttpStatus.NOT_FOUND);
    }
}