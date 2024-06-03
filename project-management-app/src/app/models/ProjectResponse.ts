import { User } from "./User";

export class ProjectResponse {

    id: number;
    name: string;
    description: string;
    createdAt: Date;
    managedBy: User;
    createdBy: User;
}
