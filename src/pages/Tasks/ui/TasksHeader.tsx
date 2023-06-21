import { FC } from 'react';
import styles from './Tasks.module.scss';
import { Button } from 'antd';
import { useModal } from '../../../app/providers/modal/modalContext';

const TasksHeader: FC = () => {
    const { setContentType } = useModal();
    const createTaskHandler = () => {
        setContentType('CREATE');
    };
    return (
        <div className={styles.header}>
            <Button onClick={createTaskHandler}>Новая задача</Button>
          </div>
    );
};

export default TasksHeader;
