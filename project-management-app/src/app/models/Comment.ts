import { User } from "./User";
import { Task } from "./Task";


export class Comment {

    id: number;
    content: string;
    createdAt: Date;
    author: User;
    task: Task;
    isEditing: boolean;
    editedContent: string;

}
