import { Person } from "../Person";


export class PersonsResponse {

    content : Person[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

// {
//     "content": [
//     ],
//     "pageable": {
//         "pageNumber": 0,
//         "pageSize": 10,
//         "sort": {
//             "sorted": true,
//             "unsorted": false,
//             "empty": false
//         },
//         "offset": 0,
//         "paged": true,
//         "unpaged": false
//     },
//     "totalPages": 1,
//     "totalElements": 2,
//     "last": true,
//     "first": true,
//     "size": 10,
//     "number": 0,
//     "sort": {
//         "sorted": true,
//         "unsorted": false,
//         "empty": false
//     },
//     "numberOfElements": 2,
//     "empty": false
// }