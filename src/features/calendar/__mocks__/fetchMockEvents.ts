import { CalendarEvent } from "../types/Events";
import rawEvents from "./mockCalendarEvents.json";

const STATIC_MOCK_EVENTS = rawEvents as CalendarEvent[];

export const fetchMockEvents = (): Promise<CalendarEvent[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(STATIC_MOCK_EVENTS);
		}, 1000);
	});
};
