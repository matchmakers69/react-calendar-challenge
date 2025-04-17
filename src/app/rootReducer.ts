import { combineReducers } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import { RootState } from "./store";
import calendarReducer from "@/features/calendar/slices/calendarSlice";

const reducers = {
	calendar: calendarReducer,
};

export const appReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
	return appReducer(state, action);
};
