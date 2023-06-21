import { Button, Input, Modal, Select } from 'antd';
import { useForm, Controller } from "react-hook-form";
import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useState } from 'react';
import {
    Task,
    TaskPriorityNames,
    TaskStatusNames
} from '../../../shared/interfaces/task.interface';
import styles from './Tasks.module.scss';
import { useActions, useTypedSelector } from '../../../app/store';
import { useModal } from '../../../app/providers/modal/modalContext';
import { getSelectOptions } from '../../../shared/utils/getSelectOptions';
import { tasksState } from '../../../app/store/selectors';

interface IOption {
    label: string;
    value: string;
}

const { TextArea } = Input;

const TaskCreate: FC = () => {
    const { authors } = useTypedSelector(tasksState);
    const { createTask } = useActions();
    const { control, handleSubmit, reset } = useForm();
    const { onClose, contentType } = useModal();
    const [statusesOptions, setStatusesOptions] = useState<IOption[]>([]);
    const [prioritiesOptions, setPrioritiesOptions] = useState<IOption[]>([]);
    const [authorsOptions, setAuthorsOptions] = useState<IOption[]>([]);

    const resetHandler = useCallback(() => {
        onClose();
        reset();
    }, [onClose, reset]);

    const getAuthor = useCallback((id: string): string => {
        const author = authors.find((author) => author.id === id);
        if (author) {
            return author.author_name;
        }
        return '';
    }, [authors]);

    const onSubmit = useCallback((data: any) => {
        const task = {
            ...data,
            priority: +data.priority,
            status: +data.status,
            schedule: {
                creation_time: dayjs().format('YYYY-MM-DDTHH:mm:ss')
            },
            author_name: getAuthor(data.author_name),
        } as Task;

        createTask(task);
        resetHandler();

    }, [createTask, getAuthor, resetHandler]);

    useEffect(() => {
        setStatusesOptions(getSelectOptions(TaskStatusNames));
        setPrioritiesOptions(getSelectOptions(TaskPriorityNames));
    }, []);

    useEffect(() => {
        if (!!authors.length) {
            setAuthorsOptions(authors.map(({ id, author_name }) => ({ value: id, label: author_name })));
        }
    }, [authors]);

    return (
        <Modal
            title="Новая задача"
            open={contentType === 'CREATE'}
            onCancel={resetHandler}
            footer={null}
            destroyOnClose
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.description}>
                    <strong>Название:</strong>
                    <Controller
                        key={authorsOptions.length}
                        render={({ field }) => <Input {...field} />}
                        name="title"
                        control={control}
                        rules={{ required: true }}
                    />
                </div>
                <div className={styles.description}>
                    <strong>Исполнитель:</strong>
                    <Controller
                        key={authorsOptions.length}
                        render={({ field }) => <Select
                            {...field}
                            options={authorsOptions}
                        />}
                        name="author_name"
                        control={control}
                        rules={{ required: true }}
                    />
                </div>

                <div className={styles.description}>
                    <strong>Описание задачи:</strong>
                    <Controller
                        key={authorsOptions.length}
                        render={({ field }) => <TextArea {...field} />}
                        name="description"
                        control={control}
                        rules={{ required: true }}
                    />
                </div>
                <div className={styles.description}>
                    <strong>Состояние:</strong>
                    <Controller
                        key={statusesOptions.length}
                        render={({ field }) => <Select
                            {...field}
                            options={statusesOptions}
                        />}
                        name="status"
                        control={control}
                        rules={{ required: true }}
                    />
                </div>
                <div className={styles.description}>
                    <strong>Приоритет:</strong>
                    <Controller
                        key={prioritiesOptions.length}
                        render={({ field }) => <Select
                            {...field}
                            options={prioritiesOptions}
                        />}
                        name="priority"
                        control={control}
                        rules={{ required: true }}
                    />
                </div>
                <div className={styles.buttons}>
                    <Button onClick={resetHandler}>Отменить</Button>
                    <Button htmlType="submit" type="primary">Сохранить</Button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskCreate;
