import { describe, it, expect } from "vitest";
import { getDay } from "date-fns";
import { getMonthMatrix } from "./dates";

describe("getMonthMatrix", () => {
	it("should return a 6x7 matrix (6 weeks, 7 days)", () => {
		const matrix = getMonthMatrix(0); // January
		expect(matrix).toHaveLength(6);
		matrix.forEach((week) => {
			expect(week).toHaveLength(7);
		});
	});

	it("should start on a Monday", () => {
		const matrix = getMonthMatrix(0); // January
		const firstDay = matrix[0][0];
		expect(getDay(firstDay)).toBe(1); // 1 = Monday
	});

	it("should contain all days of the month", () => {
		const month = 0; // January
		const matrix = getMonthMatrix(month);
		const flatDates = matrix.flat();

		const daysInMonth = flatDates.filter((date) => date.getMonth() === month);

		expect(daysInMonth.length).toBeGreaterThanOrEqual(28);
		expect(daysInMonth.length).toBeLessThanOrEqual(31);
	});

	it("should not mutate date objects", () => {
		const matrix = getMonthMatrix(3); // April
		const flattened = matrix.flat();

		const allDatesAreUnique = new Set(flattened.map((d) => d.toISOString()));
		expect(allDatesAreUnique.size).toBe(flattened.length);
	});
});
