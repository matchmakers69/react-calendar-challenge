import { getMonthMatrix, isSameDayAs, normalizeDate, today } from "@/utils";
import { CalendarEvent } from "../types";
import { CalendarCell } from "../types";

const useCalendarCells = (currentMonth: Date, events: CalendarEvent[]) => {
	const month = currentMonth.getMonth();
	const monthMatrix = getMonthMatrix(month);

	const calendarData: CalendarCell[][] = monthMatrix.map((week) =>
		week.map((day) => {
			const normalizedDay = normalizeDate(day);
			const cellEvents = events.filter((event) => {
				const startDate = normalizeDate(new Date(event.start));
				const endDate = normalizeDate(new Date(event.end));
				return normalizedDay >= startDate && normalizedDay <= endDate;
			});

			return {
				date: day,
				isToday: isSameDayAs(day, today),
				isCurrentMonth: day.getMonth() === currentMonth.getMonth(),
				events: cellEvents,
			};
		}),
	);

	return calendarData;
};

export { useCalendarCells };
