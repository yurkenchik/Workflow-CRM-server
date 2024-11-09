import {Entity, Enum, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
import {ColorTheme} from "../../../common/enums/color-theme.enum";
import {Profile} from "./profile.entity";

@Entity()
export class UserSettings {
    @PrimaryKey()
    id: string = uuid();

    @Property()
    notificationsEnabled: boolean;

    @Enum(() => ColorTheme)
    theme: ColorTheme;

    @OneToOne(() => Profile, (profile) => profile.userSettings)
    profile: Profile;
}