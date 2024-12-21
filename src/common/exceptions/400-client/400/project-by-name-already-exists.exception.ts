import { HttpException, HttpStatus } from "@nestjs/common";

export class ProjectByNameAlreadyExistsException extends HttpException {
    constructor() {
        super("Project by this name already exists", HttpStatus.BAD_REQUEST);
    }
}