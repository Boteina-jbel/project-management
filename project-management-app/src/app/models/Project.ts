import { User } from "./User";

export class Project {

    id: number;
    name: string;
    description: string;
    thumbnail: string;
    createdAt: Date;
    managedBy: User;
    createdBy: User;

}