import { combineReducers } from '@reduxjs/toolkit';
import tasks from './tasksReducer';
import user from './userReducer';

export const reducer = combineReducers({
    tasks,
    user,
});

export default reducer;

