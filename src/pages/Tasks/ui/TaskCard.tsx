import { FC } from 'react';
import { Task } from '../../../shared/interfaces/task.interface';
import { Card } from 'antd';
import TaskCardTitle from '../../../shared/ui/TaskCardTitle/TaskCardTitle';
import { useModal } from '../../../app/providers/modal/modalContext';
import { useActions } from '../../../app/store';

interface ITaskCard {
    task: Task;
}

const TaskCard: FC<ITaskCard> = ({ task }) => {
    const { title, author_name, priority } = task;
    const { setCurrentTask } = useActions();
    const { setContentType } = useModal();
    const cardToggleHandler = () => {
        setContentType('UPDATE');
        setCurrentTask(task);
    };
    return (
        <Card hoverable bordered={false} onClick={cardToggleHandler}>
            <TaskCardTitle title={title} priority={priority} />
            <hr />
            <div>{author_name}</div>
        </Card>
    );
};

export default TaskCard;
