import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCalendarCells } from "./useCalendarCells";
import { CalendarEvent } from "../types";

vi.mock("@/utils", async () => {
	const actual = await vi.importActual("@/utils");

	return {
		...actual,
		getMonthMatrix: vi.fn(() => {
			const start = new Date("2023-05-01");
			const matrix: Date[][] = [];
			for (let week = 0; week < 5; week++) {
				const days: Date[] = [];
				for (let day = 0; day < 7; day++) {
					const date = new Date(start);
					date.setDate(start.getDate() + week * 7 + day);
					days.push(date);
				}
				matrix.push(days);
			}
			return matrix;
		}),
		isSameDayAs: vi.fn((a: Date, b: Date) => a.toDateString() === b.toDateString()),
		today: new Date("2023-05-03"),
		normalizeDate: (date: Date) => {
			const d = new Date(date);
			d.setHours(0, 0, 0, 0);
			return d;
		},
	};
});

describe("useCalendarCells", () => {
	it("should return a calendar grid with correct flags and events", () => {
		const mockEvents: CalendarEvent[] = [
			{
				id: "1",
				start: "2023-05-03T10:00:00Z",
				end: "2023-05-03T11:00:00Z",
				title: "Event on May 3",
				categoryLabelColor: "",
			},
			{
				id: "2",
				start: "2023-05-10T12:00:00Z",
				end: "2023-05-10T13:00:00Z",
				title: "Event on May 10",
				categoryLabelColor: "",
			},
		];

		const currentMonth = new Date("2023-05-01");

		const { result } = renderHook(() => useCalendarCells(currentMonth, mockEvents));

		const matrix = result.current;

		expect(matrix).toHaveLength(5);
		expect(matrix[0]).toHaveLength(7);

		const may3Cell = matrix.flat().find((cell) => cell.date.toDateString() === "Wed May 03 2023");

		expect(may3Cell).toBeDefined();
		expect(may3Cell?.isToday).toBe(true);
		expect(may3Cell?.isCurrentMonth).toBe(true);
		expect(may3Cell?.events).toHaveLength(1);
		expect(may3Cell?.events[0].title).toBe("Event on May 3");

		const may10Cell = matrix.flat().find((cell) => cell.date.toDateString() === "Wed May 10 2023");

		expect(may10Cell).toBeDefined();
		expect(may10Cell?.isToday).toBe(false);
		expect(may10Cell?.events[0].title).toBe("Event on May 10");
	});
});
