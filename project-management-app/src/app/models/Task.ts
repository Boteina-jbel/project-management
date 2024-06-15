import { User } from "./User";
import { ProjectResponse } from "./ProjectResponse";
import { TaskStatus } from "./TaskStatus";
import { Priority } from "./Priority";

export class Task {

    id: number;
    name: string;
    description: string;
    estimatedTime: string;
    status: TaskStatus;
    createdAt: Date;
    assignedTo: User;
    createdBy: User;
    project: ProjectResponse;
    priority: Priority;


}