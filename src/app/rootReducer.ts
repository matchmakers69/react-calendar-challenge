import { combineReducers } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import { RootState } from "./store";
import { calendarUIReducer } from "@/features/calendar/slices";
import { calendarReducer } from "@/features/calendar/slices/calendarSlice";

const reducers = {
	calendar: calendarReducer,
	calendarUI: calendarUIReducer,
};

const appReducer = combineReducers<typeof reducers>(reducers);

const rootReducer: Reducer<RootState> = (state, action) => {
	return appReducer(state, action);
};

export { appReducer, rootReducer };
