import styles from './Tasks.module.scss';
import { FC, useCallback, useMemo, useState } from 'react';
import { Task } from '../../../shared/interfaces/task.interface';
import TaskCard from './TaskCard';
import { Card, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { BsSortDown, BsSortDownAlt, BsSortUp, BsSortUpAlt } from 'react-icons/bs';
import classNames from 'classnames';

interface Group {
    tasks: Task[];
    title: string;
}

enum SortType {
    PRIORITY = 'PRIORITY',
    DATE = 'DATE',
}

enum Sort {
    P_ASC = 'P_ASC',
    P_DESC = 'P_DESC',
    D_ASC = 'D_ASC',
    D_DESC = 'D_DESC'
}

const TasksGroup: FC<Group> = ({ title, tasks }) => {
    const [activeSort, setActiveSort] = useState<SortType>(SortType.PRIORITY);
    const [sortType, setSortType] = useState<Record<SortType, Sort>>({
        [SortType.PRIORITY]: Sort.P_ASC,
        [SortType.DATE]: Sort.D_ASC,
    });

    const sortedTasks: Task[] = useMemo(() => {
        switch (sortType[activeSort]) {
            case Sort.P_DESC:
                return tasks.sort((a, b) => b.priority - a.priority);
            case Sort.D_ASC:
                return tasks.sort((a, b) => +dayjs(a.schedule.creation_time) - +dayjs(b.schedule.creation_time));
            case Sort.D_DESC:
                return tasks.sort((a, b) => +dayjs(b.schedule.creation_time) - +dayjs(a.schedule.creation_time));
            default:
                return tasks.sort((a, b) => a.priority - b.priority);

        }
    }, [activeSort, sortType, tasks]);

    const sortHandler = useCallback((type: SortType, sort: Sort) => () => {
        setActiveSort(type);

        if (type === SortType.PRIORITY) {
            setSortType({
                ...sortType,
                [type]: sort === Sort.P_ASC
                    ? Sort.P_DESC
                    : Sort.P_ASC
            });
        }

        if (type === SortType.DATE) {
            setSortType({
                ...sortType,
                [type]: sort === Sort.D_ASC
                    ? Sort.D_DESC
                    : Sort.D_ASC
            });
        }
    }, [sortType]);

    return (
        <Card>
            <div className={styles.group__title}>
                <div>{title}</div>
                <div className={styles.sort}>
                    <Tooltip placement="top" title="Сортировать по приоритету">
                        {
                            sortType[SortType.PRIORITY] === Sort.P_ASC
                                ? <i
                                    onClick={sortHandler(SortType.PRIORITY, Sort.P_ASC)}
                                    className={classNames(styles.sort__icon, {
                                        [styles.sort__icon_active]: activeSort === SortType.PRIORITY,
                                    })}><BsSortUp /></i>
                                : <i
                                    onClick={sortHandler(SortType.PRIORITY, Sort.P_DESC)}
                                    className={classNames(styles.sort__icon, {
                                        [styles.sort__icon_active]: activeSort === SortType.PRIORITY,
                                    })}><BsSortUpAlt /></i>
                        }
                    </Tooltip>
                    <Tooltip placement="top" title="Сортировать по дате создания">
                        {
                            sortType[SortType.DATE] === Sort.D_ASC ? <i
                                    onClick={sortHandler(SortType.DATE, Sort.D_ASC)}
                                    className={classNames(styles.sort__icon, {
                                        [styles.sort__icon_active]: activeSort === SortType.DATE,
                                    })}><BsSortDown /></i>
                                : <i
                                    onClick={sortHandler(SortType.DATE, Sort.D_DESC)}
                                    className={classNames(styles.sort__icon, {
                                        [styles.sort__icon_active]: activeSort === SortType.DATE,
                                    })}><BsSortDownAlt /></i>
                        }
                    </Tooltip>
                </div>
            </div>
            <div className={styles.group}>
                {
                    sortedTasks.map((task) => <TaskCard key={task.id} task={task} />)
                }
            </div>
        </Card>
    );
};

export default TasksGroup;
