import { Profile } from "./Profile";
import { ProfileEndpoint } from "./ProfileEndpoint";

export class User {

    id: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    thumbnail: string;
    token: string;
    profile: Profile;
    profileEndpoint: ProfileEndpoint[];

}
