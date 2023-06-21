import { FC } from 'react';
import styles from './TaskCardTitle.module.scss';
import { TaskPriority } from '../../interfaces/task.interface';
import classnames from 'classnames';

interface ITaskCardTitle {
    title: string;
    priority: TaskPriority;
}

const TaskCardTitle: FC<ITaskCardTitle> = ({ title, priority }) => {
    return (
        <div className={styles.container}>
            <div className={classnames(styles.indicator, {
                [styles.first]: priority === TaskPriority.FIRST,
                [styles.second]: priority === TaskPriority.SECOND,
                [styles.third]: priority === TaskPriority.THIRD,
            })} />
            <div>{title}</div>
        </div>
    );
};

export default TaskCardTitle;
