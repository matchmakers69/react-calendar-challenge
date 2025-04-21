import { CalendarEvent } from "./Events";

export type CalendarCell = {
	date: Date;
	isToday: boolean;
	isCurrentMonth: boolean;
	events: CalendarEvent[];
};
