export interface Task {
    "id": string;
    "status": TaskStatus;
    "priority": TaskPriority;
    "title": string;
    "description": string;
    "schedule": {
        "creation_time": Date
    },
    "author_name": string;
}

export enum TaskStatus {
    IN_QUEUE ,
    IN_PROGRESS,
    DONE
}

export enum TaskPriority {
    FIRST,
    SECOND,
    THIRD
}

export const TaskStatusNames = {
    [TaskStatus.IN_QUEUE] : 'В очереди',
    [TaskStatus.IN_PROGRESS] : 'В работе',
    [TaskStatus.DONE] : 'Выполнено',
}

export const TaskPriorityNames = {
    [TaskPriority.FIRST] : 'Срочно',
    [TaskPriority.SECOND] : 'Важно',
    [TaskPriority.THIRD] : 'Не срочно',
}