import { User } from "./User";
import { ProjectResponse } from "./ProjectResponse";
import { TaskStatus } from "./TaskStatus";


export class FeatureTaskResponse {

    id: number;
    name: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    assignedTo: User;
    project: ProjectResponse;
    priority: string;
    acceptanceCriteria: string;

}
