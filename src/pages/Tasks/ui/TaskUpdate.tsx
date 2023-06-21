import { Button, Modal, Select } from 'antd';
import { FC, useCallback, useEffect, useState } from 'react';
import {
    Task,
    TaskPriorityNames,
    TaskStatusNames
} from '../../../shared/interfaces/task.interface';
import styles from './Tasks.module.scss';
import { useActions } from '../../../app/store';
import { useModal } from '../../../app/providers/modal/modalContext';
import { Controller, useForm } from 'react-hook-form';
import { getSelectOptions } from '../../../shared/utils/getSelectOptions';

interface ITaskUpdate {
    task: Task;
}

interface IOption {
    label: string;
    value: string;
}

const TaskUpdate: FC<ITaskUpdate> = ({ task }) => {
    const {
        id,
        title,
        author_name,
        description,
        status,
        priority
    } = task;
    const { deleteTask, updateTask, setCurrentTask } = useActions();
    const { control, handleSubmit, watch } = useForm();
    const { onClose, contentType } = useModal();

    const [statusesOptions, setStatusesOptions] = useState<IOption[]>([]);
    const [prioritiesOptions, setPrioritiesOptions] = useState<IOption[]>([]);
    const [disabled, setDisabled] = useState(true);

    const deleteTaskHandler = () => {
        deleteTask(id);
        onClose();
        setCurrentTask(null);
    };

    const onSubmit = useCallback((data: any) => {
        const task = { id } as Task;
        if (typeof data.status !== 'undefined') {
            task.status = +data.status;
        }
        if (typeof data.priority !== 'undefined') {
            task.priority = +data.priority;
        }

        updateTask(task);
        onClose();
        setCurrentTask(null);
    }, [id, onClose, setCurrentTask, updateTask]);

    useEffect(() => {
        setStatusesOptions(getSelectOptions(TaskStatusNames));
        setPrioritiesOptions(getSelectOptions(TaskPriorityNames));
    }, []);

    useEffect(() => {
        watch((data) => {
            setDisabled(!(status !== +data.status || priority !== +data.priority));
        });
    }, [priority, status, watch]);

    return (
        <Modal
            title={title}
            open={contentType === 'UPDATE'}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.description}>
                    <strong>Исполнитель:</strong>
                    <i>{author_name}</i>
                </div>
                <div className={styles.description}>
                    <strong>Описание задачи:</strong>
                    <i>{description}</i>
                </div>
                <div className={styles.description}>
                    <strong>Состояние:</strong>
                    <Controller
                        key={statusesOptions.length}
                        render={({ field }) => <Select
                            {...field}
                            options={statusesOptions}
                            defaultValue={status.toString()}
                        />}
                        name="status"
                        control={control}
                    />
                </div>
                <div className={styles.description}>
                    <strong>Приоритет:</strong>
                    <Controller
                        key={prioritiesOptions.length}
                        render={({ field }) => <Select
                            {...field}
                            options={prioritiesOptions}
                            defaultValue={priority.toString()}
                        />}
                        name="priority"
                        control={control}
                    />
                </div>
                <div className={styles.buttons}>
                    <Button danger onClick={deleteTaskHandler}>Удалить</Button>
                    <Button disabled={disabled} htmlType="submit" type="primary">Сохранить</Button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskUpdate;
