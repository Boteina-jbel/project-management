import { ProjectResponse } from "./ProjectResponse";


export class BugTaskResponse {

    id: number;
    name: string;
    description: string;
    estimatedTime: string;
    statusName: string;
    assignedToId: number;
    assignedToName: string;
    project: ProjectResponse;
    projectName: string;
    createdAt: Date;
    severity: string;
    stepsToReproduce: string;

}
