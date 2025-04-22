import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus } from "@/shared/types/LoadingStatus";
import { CalendarEvent } from "../types";
import { fetchCalendarEvents, FetchCalendarEventsError } from "../thunks";

interface CalendarEventState {
	loadingStatus: LoadingStatus;
	error: string | null;
	events: CalendarEvent[];
	didLoadFromStorage: boolean;
	past: CalendarEvent[][];
	future: CalendarEvent[][];
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

const saveEventsToLocalStorage = (events: CalendarEvent[]) => {
	localStorage.setItem("events", JSON.stringify(events));
};

const initialState: CalendarEventState = {
	loadingStatus: LoadingStatus.IDLE,
	error: null,
	events: loadFromStorage(),
	didLoadFromStorage: true,
	past: [],
	future: [],
};

const CalendarEventSlice = createSlice({
	name: "calendarEvent",
	initialState,
	reducers: {
		addEvent: (state, action: PayloadAction<CalendarEvent>) => {
			state.past.push([...state.events]);
			state.future = [];
			state.events.push(action.payload);
			saveEventsToLocalStorage(state.events);
		},
		updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
			state.events = state.events.map((event) => (event.id === action.payload.id ? action.payload : event));
			saveEventsToLocalStorage(state.events);
		},
		deleteEvent: (state, action: PayloadAction<string>) => {
			state.past.push([...state.events]);
			state.events = state.events.filter((event) => event.id !== action.payload);
			state.future = [];
			saveEventsToLocalStorage(state.events);
		},
		undo: (state) => {
			if (state.past.length > 0) {
				const previous = state.past.pop()!;
				state.future.unshift([...state.events]);
				state.events = previous;
				saveEventsToLocalStorage(state.events);
			}
		},
		redo: (state) => {
			if (state.future.length > 0) {
				const next = state.future.shift()!;
				state.past.push([...state.events]);
				state.events = next;
				saveEventsToLocalStorage(state.events);
			}
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
				saveEventsToLocalStorage(state.events);
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

export const { addEvent, updateEvent, deleteEvent, undo, redo } = CalendarEventSlice.actions;
const calendarEventReducer = CalendarEventSlice.reducer;

export { calendarEventReducer };
