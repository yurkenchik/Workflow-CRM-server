import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {UserService} from "../../application/services/user.service";
import {UserId} from "../../common/decorators/user-id.decorator";
import {User} from "../../domain/entities/user.entity";
import {CreateUserDto} from "../../application/dto/user/create-user.dto";
import {UpdateUserDto} from "../../application/dto/user/update-user.dto";

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get("me")
    async findMe(@UserId()userId: string): Promise<User> {
        return this.userService.findUserById(userId);
    }

    @Get(":id")
    async findUserById(@Param("id") userId: string): Promise<User> {
        return this.userService.findUserById(userId);
    }

    @Get()
    async findUsers(): Promise<Array<User>> {
        return this.userService.findUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Patch()
    async updateUser(@UserId() userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(userId, updateUserDto);
    }

    @Delete()
    async deleteUser(@UserId() userId: string): Promise<void> {
        return this.userService.deleteUser(userId);
    }
}