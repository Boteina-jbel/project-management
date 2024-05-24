import { City } from "./City";

export class Country {
    id: number;
    code: string;
    name: string;
    rank: number;
    cities: City[];
}
