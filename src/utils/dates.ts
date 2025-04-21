import { format, formatISO, getDay, isToday } from "date-fns";
import {
	addMonths,
	subMonths,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	isSameDay,
	parseISO,
	addDays,
	startOfToday,
} from "date-fns";

const today = new Date();

const formattedCurrentDate = format(today, "dd/MM/yyyy");

function getToday(): Date {
	return startOfToday();
}

const getPreviousMonth = (date: Date, days: number): Date => {
	return subMonths(date, days);
};

const getNextMonth = (date: Date, days: number): Date => {
	return addMonths(date, days);
};

const getAddDays = (date: Date, days: number): Date => {
	return addDays(date, days);
};

const formatMonthHeader = (date: Date): string => {
	return format(date, "MMMM yyyy");
};

const formatDay = (day: Date): string => {
	return format(day, "dd");
};

const formatWeekDay = (day: Date, formatDays: string): string => {
	return format(day, formatDays);
};

const getStartOfMonth = (date: Date): Date => {
	return startOfMonth(date);
};

const getEndOfMonth = (date: Date): Date => {
	return endOfMonth(date);
};

const getStartOfWeek = (date: Date): Date => {
	return startOfWeek(date, { weekStartsOn: 1 });
};

const getEndOfWeek = (date: Date): Date => {
	return endOfWeek(date, { weekStartsOn: 1 });
};

const isSameDayAs = (dateInput: string | Date, otherDate: Date): boolean => {
	const parsedDate = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
	return isSameDay(parsedDate, otherDate);
};

const getWeekDays = (date: Date) => {
	const start = startOfWeek(date, { weekStartsOn: 1 });
	const weekDates = [];

	for (let i = 0; i < 7; i++) {
		const currentDate = addDays(start, i);

		weekDates.push({
			currentDate,
			today: isToday(currentDate),
			isCurrentDay: isSameDay(currentDate, today),
		});
	}

	return weekDates;
};

const getMonthMatrix = (month: number = new Date().getMonth()) => {
	const year = new Date().getFullYear();
	const firstOfMonth = new Date(year, month, 1);

	const dayIndex = getDay(firstOfMonth); // 0 (Sun) to 6 (Sat)
	const offset = dayIndex === 0 ? -6 : 1 - dayIndex; // I want to start on Monday
	const startDate = addDays(firstOfMonth, offset);

	let currentDate = startDate;
	const weeks = Array.from({ length: 6 }, () =>
		Array.from({ length: 7 }, () => {
			const date = currentDate;
			currentDate = addDays(currentDate, 1);
			return date;
		}),
	);

	return weeks;
};

const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const normalizeDateTime = (value: string) => formatISO(parseISO(value));

export {
	today,
	getNextMonth,
	getAddDays,
	getPreviousMonth,
	formatMonthHeader,
	formatWeekDay,
	getStartOfMonth,
	getEndOfWeek,
	getStartOfWeek,
	getEndOfMonth,
	isSameDayAs,
	formatDay,
	getMonthMatrix,
	getWeekDays,
	getToday,
	formattedCurrentDate,
	normalizeDate,
	normalizeDateTime,
};
