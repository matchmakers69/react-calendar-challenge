import { combineReducers } from "@reduxjs/toolkit";
import { Reducer } from "redux";
import { RootState } from "./store";
import { calendarEventReducer, calendarUIReducer } from "@/features/calendar/slices";

const reducers = {
	calendarEvent: calendarEventReducer,
	calendarUI: calendarUIReducer,
};

const appReducer = combineReducers<typeof reducers>(reducers);

const rootReducer: Reducer<RootState> = (state, action) => {
	return appReducer(state, action);
};

export { appReducer, rootReducer };
