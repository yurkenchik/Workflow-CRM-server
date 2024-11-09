import {User} from "../entities/user.entity";

export class UserAggregate {
    private readonly user: User;

    constructor(user: User) {
        this.user = user;
    }

    getUser(): User {
        return this.user;
    }


}