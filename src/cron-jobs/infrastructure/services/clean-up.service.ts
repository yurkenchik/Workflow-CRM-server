import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { subMinutes } from "date-fns/subMinutes";

import { ConfirmationCode } from "src/authorization/domain/entities/confirmation-code.entity";
import { User } from "src/authorization/domain/entities/user.entity";

@Injectable()
export class CleanUpService {
    constructor(
        @InjectRepository(ConfirmationCode)
        private readonly confirmationCodeRepository: EntityRepository<ConfirmationCode>,
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
    ) {}

    @Cron(CronExpression.EVERY_10_MINUTES)
    async handleExpiredConfirmationCode(): Promise<void> {
        await this.confirmationCodeRepository
            .createQueryBuilder()
            .delete()
            .from(ConfirmationCode)
            .where({ expiresAt: { $lt: new Date() } })
            .execute();
    }

    @Cron(CronExpression.EVERY_2_HOURS)
    async handleUnverifiedUserAccounts(): Promise<void> {
        const thresholdDate = subMinutes(new Date(), 20);

        await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where({ isAccountVerified: false })
            .andWhere({ createdAt: { $lt: thresholdDate } });
    }
}