import { Department } from "./Department";
import { Establishment } from "./Establishment";

export class ClassRoom {
    id: number;
    code: string;
    name: string;
    establishment?: Establishment;
    department?: Department;
}