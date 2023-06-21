import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../../shared/interfaces/task.interface';
import { fetchAuthors, fetchTasks } from '../actions';
import { Author } from '../../../shared/interfaces/author.interface';

interface ITasksState {
    loading: boolean;
    error: string | undefined;
    tasks: Task[];
    authors: Author[];
    currentTask: Task | null;
}

const initialState: ITasksState = {
    loading: false,
    error: '',
    tasks: [],
    authors: [],
    currentTask: null,
};

export const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state: ITasksState, { payload }: PayloadAction<Task[]>) => {
            state.tasks = payload;
        },
        setCurrentTask: (state: ITasksState, { payload }: PayloadAction<Task | null>) => {
            state.currentTask = payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<ITasksState>) => {
        builder.addCase(fetchTasks.fulfilled, (state: ITasksState, { payload }: PayloadAction<Task[]>) => {
            state.loading = false;
            state.tasks = payload;
        })
            .addCase(fetchTasks.pending, (state: ITasksState) => {
                state.loading = true;
            })
            .addCase(fetchAuthors.fulfilled, (state: ITasksState, { payload }: PayloadAction<Author[]>) => {
                state.loading = false;
                state.authors = payload;
            });
    }
});

export default tasksReducer.reducer;
