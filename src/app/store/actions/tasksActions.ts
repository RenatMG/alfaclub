import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ActionType } from './actions';
import api from '../../api/api';
import { Task } from '../../../shared/interfaces/task.interface';
import { combineUrl } from '../../api/url';
import { Endpoints } from '../../api/endpoints';


export const fetchTasks = createAsyncThunk(
    ActionType.TASKS_FETCH,
    async (_, { rejectWithValue }) => {
        try {
            const url = combineUrl(Endpoints.TASKS);
            const { data }: AxiosResponse = await api.get(url);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteTask = createAsyncThunk(
    ActionType.DELETE_TASK,
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            const url = combineUrl(Endpoints.TASKS, [id]);
            const { data }: AxiosResponse = await api.delete(url);
            dispatch(fetchTasks());
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateTask = createAsyncThunk(
    ActionType.DELETE_TASK,
    async (task: Task, { rejectWithValue, dispatch }) => {
        try {
            const url = combineUrl(Endpoints.TASKS, [task.id]);
            const { data }: AxiosResponse = await api.patch(url, { ...task });
            dispatch(fetchTasks());
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const createTask = createAsyncThunk(
    ActionType.CREATE_TASK,
    async (task: Task, { rejectWithValue, dispatch }) => {
        try {
            const url = combineUrl(Endpoints.TASKS, [task.id]);
            const { data }: AxiosResponse = await api.post(url, { ...task });
            dispatch(fetchTasks());
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchAuthors = createAsyncThunk(
    ActionType.AUTHORS_FETCH,
    async (_, { rejectWithValue }) => {
        try {
            const url = combineUrl(Endpoints.AUTHORS);
            const { data }: AxiosResponse = await api.get(url);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
