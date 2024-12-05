import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMemberCommand } from "src/project/infrastructure/commands/create-member/create-member.command";
import { MemberService } from "src/project/infrastructure/services/member.service";
import { Member } from "src/project/domain/entities/member.entity";

@CommandHandler(CreateMemberCommand)
export class CreateMemberCommandHandler implements ICommandHandler<CreateMemberCommand> {
    constructor(private readonly memberService: MemberService) {}

    async execute(command: CreateMemberCommand): Promise<Member> {
        const { userId, projectId, createMemberDto } = command;

        return this.memberService.createMember(
            userId,
            projectId,
            createMemberDto
        );
    }
}