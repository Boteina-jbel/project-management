import { Teacher } from "./Teacher";
import { AcademicProgram } from "./AcademicProgram";
import { Semester } from "./Semester";
export class Course {
    id: number;
    code: string;
    title: string;
    description: string;
    thumbnail: string;
    creditHours: number;
    coefficient: number;
    hold: boolean;
    teacher: Teacher;
    academicProgram: AcademicProgram;
    semester: Semester;
}
