import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus } from "@/shared/types/LoadingStatus";
import { CalendarEvent } from "../types";
import { fetchCalendarEvents, FetchCalendarEventsError } from "../thunks";

interface CalendarEventState {
	loadingStatus: LoadingStatus;
	error: string | null;
	events: CalendarEvent[];
	didLoadFromStorage: boolean;
}

const loadFromStorage = (): CalendarEvent[] => {
	try {
		const stored = localStorage.getItem("events");
		return stored ? JSON.parse(stored) : [];
	} catch (err) {
		console.error("Error reading from localStorage:", err);
		return [];
	}
};

const initialState: CalendarEventState = {
	loadingStatus: LoadingStatus.IDLE,
	error: null,
	events: loadFromStorage(),
	didLoadFromStorage: true,
};

const CalendarEventSlice = createSlice({
	name: "calendarEvent",
	initialState,
	reducers: {
		addEvent: (state, action: PayloadAction<CalendarEvent>) => {
			state.events.push(action.payload);
			localStorage.setItem("events", JSON.stringify(state.events));
		},
		updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
			state.events = state.events.map((event) => (event.id === action.payload.id ? action.payload : event));
			localStorage.setItem("events", JSON.stringify(state.events));
		},
		deleteEvent: (state, action: PayloadAction<string>) => {
			state.events = state.events.filter((event) => event.id !== action.payload);
			localStorage.setItem("events", JSON.stringify(state.events));
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCalendarEvents.pending, (state) => {
			state.loadingStatus = LoadingStatus.PENDING;
			state.events = [];
			state.error = null;
		});
		builder.addCase(fetchCalendarEvents.fulfilled, (state, action) => {
			state.loadingStatus = LoadingStatus.SUCCESS;
			state.events = action.payload;
			state.didLoadFromStorage = false;
			if (action.payload.length === 0) {
				localStorage.removeItem("events");
			} else {
				localStorage.setItem("events", JSON.stringify(action.payload));
			}
		});
		builder.addCase(
			fetchCalendarEvents.rejected,
			(state, action: PayloadAction<FetchCalendarEventsError | undefined>) => {
				state.loadingStatus = LoadingStatus.FAILED;
				state.error = action.payload?.message ?? "Error occurred when fetching events";
				state.events = [];
			},
		);
	},
});

export const { addEvent, updateEvent, deleteEvent } = CalendarEventSlice.actions;
const calendarEventReducer = CalendarEventSlice.reducer;

export { calendarEventReducer };
