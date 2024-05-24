import { Degree } from "./Degree";
import { Department } from "./Department";

export class AcademicProgram {
    id:number;
    code:string;   
    name:string ;
    description: string;
    department:Department ;
    degree :Degree;
}