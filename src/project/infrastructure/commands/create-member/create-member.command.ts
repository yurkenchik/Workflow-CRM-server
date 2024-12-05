import { CreateMemberDto } from "src/project/domain/dto/create-member.dto";

export class CreateMemberCommand {
    constructor(
        public readonly userId: string,
        public readonly projectId: string,
        public readonly createMemberDto: CreateMemberDto,
    ) {}
}