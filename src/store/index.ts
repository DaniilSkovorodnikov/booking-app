import {combineReducers} from "@reduxjs/toolkit";
import {api} from "./api/api.ts";

export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer
})

export type RootState = ReturnType<typeof rootReducer>
