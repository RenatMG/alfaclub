import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux/es/types';
import { useSelector } from 'react-redux';
import reducer from './reducers';


export const store = configureStore({
    reducer,
    // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof reducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
