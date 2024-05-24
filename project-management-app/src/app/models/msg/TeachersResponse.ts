import { Teacher } from "../Teacher";


export class TeachersResponse {

    content : Teacher[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

