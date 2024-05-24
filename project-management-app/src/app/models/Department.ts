import { Establishment } from "./Establishment";

export class Department {
    id: number;
    code: string;
    name: string;
    description: string;
    rank: number;
    establishment: Establishment;
}