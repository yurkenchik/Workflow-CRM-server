import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProfileCommand } from 'src/profile/infrastructure/commands/create-profile/create-profile.command';
import { ProfileService } from 'src/profile/infrastructure/services/profile.service';
import { ProfileResponseDto } from 'src/profile/domain/dto/response/profile-response.dto';

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommandHandler implements ICommandHandler {
    constructor(
        private readonly profileService: ProfileService
    ) {}

    async execute(command: CreateProfileCommand): Promise<ProfileResponseDto> {
        const { userId, createProfileDto } = command;
        return this.profileService.createProfile(userId, createProfileDto);
    }
}