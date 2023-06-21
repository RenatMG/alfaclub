import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../shared/interfaces/user.interface';

interface IUserState {
    loading: boolean;
    user: User | null;
}

const initialState: IUserState = {
    loading: false,
    user: null,
};

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: IUserState, { payload }: PayloadAction<User>) => {
            state.user = payload;
        },
        removeUser: (state: IUserState) => {
            state.user = null;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
        // builder.addCase(fetchTasks.fulfilled, (state: ITasksState, { payload }: PayloadAction<Task[]>) => {
        //     state.loading = false;
        //     state.tasks = payload;
        // })
        //     .addCase(fetchTasks.pending, (state: ITasksState) => {
        //         state.loading = true;
        //     })
        //     .addCase(fetchAuthors.fulfilled, (state: ITasksState, { payload }: PayloadAction<Author[]>) => {
        //         state.loading = false;
        //         state.authors = payload;
        //     });
    }
});

export default userReducer.reducer;
