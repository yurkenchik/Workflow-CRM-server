import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";

import { AuthorizationUserService } from "src/authorization/infrastructure/services/authorization-user.service";
import { AuthorizationAggregate } from "src/authorization/domain/aggregate/authorization.aggregate";
import { ConfirmationCodeNotFoundException } from "src/common/exceptions/400-client/404/confirmation-code-not-found.exception";
import { CodesDontMatchException } from "src/common/exceptions/400-client/400/codes-dont-match.exception";

import { ConfirmationCode } from "src/authorization/domain/entities/confirmation-code.entity";
import { GenerateConfirmationCodeDto } from "src/authorization/domain/dto/generate-confirmation-code.dto";

@Injectable()
export class ConfirmationCodeService {
    private readonly authorizationAggregate: AuthorizationAggregate = new AuthorizationAggregate();

    constructor(
        @InjectRepository(ConfirmationCode)
        private readonly confirmationCodeRepository: EntityRepository<ConfirmationCode>,
        private readonly userService: AuthorizationUserService,
    ) {}

    async getConfirmationCodeById(confirmationCodeId: string): Promise<ConfirmationCode> {
        const confirmationCode = await this.confirmationCodeRepository
            .createQueryBuilder()
            .where({ id: confirmationCodeId })
            .getSingleResult();

        if (!confirmationCode) {
            throw new ConfirmationCodeNotFoundException();
        }
        return confirmationCode;
    }

    async verifyConfirmationCode(value: string): Promise<void> {
         const confirmationCode = await this.confirmationCodeRepository
             .createQueryBuilder()
             .where({ value })
             .getSingleResult();

         if (!confirmationCode) {
             throw new CodesDontMatchException();
         }
    }

    async createConfirmationCode(
        userId: string,
        generateConfirmationCodeDto: GenerateConfirmationCodeDto
    ): Promise<ConfirmationCode> {
        const user = await this.userService.getUserById(userId);
        const confirmationCodeData = this.authorizationAggregate.generateConfirmationCode(user, generateConfirmationCodeDto);

        const confirmationCode = await this.confirmationCodeRepository
            .createQueryBuilder()
            .insert({
                ...confirmationCodeData,
                user
            })
            .returning("id")
            .execute();

        return this.getConfirmationCodeById(confirmationCode.insertId);
    }

    async deleteConfirmationCodeByUser(userId: string): Promise<void> {
        await this.confirmationCodeRepository
            .createQueryBuilder()
            .delete()
            .from(ConfirmationCode)
            .where({ user: { id: userId } })
            .execute();
    }
}