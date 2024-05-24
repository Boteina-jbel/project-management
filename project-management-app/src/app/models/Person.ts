import { City } from "./City";
import { Country } from "./Country";
import { LegalIdType } from "./LegalIdType";
import { Profile } from "./Profile";

export class Person {
    id: number;
    username: string;
    password: string;
    gender: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    legalIdNumber: string;
    thumbnail: string;
    legalIdType: LegalIdType;
    citizenship: Country;
    city: City;
    profile: Profile;
}
