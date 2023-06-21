import styles from './Tasks.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../app/providers/auth/AuthProvider';
import { FC, useEffect, useState } from 'react';
import { useActions, useTypedSelector } from '../../../app/store';
import { tasksState } from '../../../app/store/selectors';
import { Task, TaskStatus, TaskStatusNames } from '../../../shared/interfaces/task.interface';
import TasksHeader from './TasksHeader';
import TasksGroup from './TasksGroup';
import TaskUpdate from './TaskUpdate';
import TaskCreate from './TaskCreate';
import { auth } from '../../../firebase';

type IGroup = Record<TaskStatus, Task[]>;

const TasksPage: FC = () => {
    const [user, loading] = useAuthState(auth);
    const { tasks, currentTask } = useTypedSelector(tasksState);
    const { authenticated } = useAuth();
    const location = useLocation();
    const { fetchTasks, fetchAuthors } = useActions();
    const [group, setGroup] = useState<IGroup>({} as IGroup);

    useEffect(() => {
        if (authenticated) {
            fetchTasks();
            fetchAuthors();
        }
    }, [authenticated, fetchAuthors, fetchTasks]);

    useEffect(() => {
        if (!!tasks.length) {
            const group = {} as IGroup;
            group[TaskStatus.IN_QUEUE] = tasks.filter(({ status }) => status === TaskStatus.IN_QUEUE);
            group[TaskStatus.IN_PROGRESS] = tasks.filter(({ status }) => status === TaskStatus.IN_PROGRESS);
            group[TaskStatus.DONE] = tasks.filter(({ status }) => status === TaskStatus.DONE);
            setGroup(group);
        }
    }, [tasks]);

    if (!user?.uid && !loading) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return (
        <div className={styles.wrapper}>
            <TasksHeader />
            <TaskCreate />
            {currentTask && <TaskUpdate task={currentTask} />}
            <div className={styles.groups}>
                {
                    !!group[TaskStatus.IN_QUEUE]?.length
                    && (<TasksGroup
                        tasks={group[TaskStatus.IN_QUEUE]}
                        title={TaskStatusNames[TaskStatus.IN_QUEUE]}
                    />)
                }
                {
                    !!group[TaskStatus.IN_PROGRESS]?.length
                    && (<TasksGroup
                        tasks={group[TaskStatus.IN_PROGRESS]}
                        title={TaskStatusNames[TaskStatus.IN_PROGRESS]}
                    />)
                }
                {
                    !!group[TaskStatus.DONE]?.length
                    && (<TasksGroup
                        tasks={group[TaskStatus.DONE]}
                        title={TaskStatusNames[TaskStatus.DONE]}
                    />)
                }
            </div>
        </div>
    );
};

export default TasksPage;
