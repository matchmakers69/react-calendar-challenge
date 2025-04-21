import { createAsyncThunk } from "@reduxjs/toolkit";
import { CalendarEvent } from "../types/Events";
import { fetchMockEvents } from "../__mocks__/fetchMockEvents";

type FetchCalendarEventsError = {
	message: string;
	code?: number;
	status?: string;
};

const fetchCalendarEvents = createAsyncThunk<
	CalendarEvent[],
	void,
	{ rejectValue: FetchCalendarEventsError }
>("calendar/fetchCalendarEvents", async (_, thunkAPI) => {
	try {
		const events = await fetchMockEvents();
		return events;
	} catch (err) {
		console.error(err); // Perhaps better errr handling here
		return thunkAPI.rejectWithValue({
			message: err instanceof Error ? err.message : "Unknown error when fetching events",
		});
	}
});

export { fetchCalendarEvents };
export type { FetchCalendarEventsError };
