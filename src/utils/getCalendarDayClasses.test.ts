import { describe, it, expect } from "vitest";
import { getCalendarDayClasses } from "./getCalendarDayClasses";
import { CalendarCell } from "@/features/calendar/types/CalendarCell";

describe("getCalendarDayClasses", () => {
	it("should add correct classes for today", () => {
		const cell: CalendarCell = {
			date: new Date(),
			isToday: true,
			isCurrentMonth: true,
			events: [],
		};

		const result = getCalendarDayClasses(cell);

		expect(result).toContain("calendar-cell");
		expect(result).toContain("bg-light-green");
		expect(result).toContain("text-black");
	});

	it("should add correct classes for day outside current month", () => {
		const cell: CalendarCell = {
			date: new Date(),
			isToday: false,
			isCurrentMonth: false,
			events: [],
		};

		const result = getCalendarDayClasses(cell);

		expect(result).toContain("text-gray-400");
		expect(result).toContain("bg-light-grey");
		expect(result).not.toContain("bg-light-green");
	});

	it("should add correct classes for regular current month day", () => {
		const cell: CalendarCell = {
			date: new Date(),
			isToday: false,
			isCurrentMonth: true,
			events: [],
		};

		const result = getCalendarDayClasses(cell);

		expect(result).toContain("bg-white");
		expect(result).toContain("text-black");
		expect(result).not.toContain("text-gray-400");
		expect(result).not.toContain("bg-light-green");
	});

	it("should not include cursor-pointer when there are no events", () => {
		const cell: CalendarCell = {
			date: new Date(),
			isToday: false,
			isCurrentMonth: true,
			events: [],
		};

		const result = getCalendarDayClasses(cell);

		expect(result).not.toContain("cursor-pointer");
	});
});
