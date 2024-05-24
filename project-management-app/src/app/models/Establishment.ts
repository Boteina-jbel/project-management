import { City } from "./City";
import { University } from "./University";

export class Establishment {
    id: number;
    code: string;
    rank: number;
    name: string;
    description: string;
    thumbnail:string;
    university:University; 
    city: City;
}