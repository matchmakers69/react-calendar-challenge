/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useAppSelector } from "@/app/useAppSelector";
import { CalendarWrapper } from "./CalendarWrapper";

const mockDispatch = vi.fn();

vi.mock("@/app/useAppSelector", () => ({
	useAppSelector: vi.fn(() => ({
		isModalOpen: false,
		modalData: null,
	})),
}));

vi.mock("@/app/useAppDispatch", () => ({
	useAppDispatch: () => mockDispatch,
}));

vi.mock("./CalendarSidebar", () => ({
	CalendarSidebar: () => <div data-testid="calendar-sidebar">Sidebar</div>,
}));

vi.mock("./CalendarContent", () => ({
	CalendarContent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="calendar-content">{children}</div>
	),
}));

vi.mock("./Calendar", () => ({
	Calendar: () => <div data-testid="calendar">Calendar</div>,
}));

describe("<CalendarWrapper />", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useAppSelector as Mock).mockImplementation((selector: any) =>
			selector({
				calendarUI: {
					isModalOpen: false,
					modalData: null,
				},
				calendarEvent: {
					events: [],
				},
			}),
		);
	});
	it("should render calendar wrapper with sidebar, content, and calendar", () => {
		render(<CalendarWrapper />);

		expect(screen.getByTestId("calendar-wrapper")).toBeInTheDocument();
		expect(screen.getByTestId("calendar-sidebar")).toBeInTheDocument();
		expect(screen.getByTestId("calendar-content")).toBeInTheDocument();
		expect(screen.getByTestId("calendar")).toBeInTheDocument();
	});

	it("should render modal in create mode when isModalOpen is true", () => {
		(useAppSelector as Mock).mockImplementation((selector: any) =>
			selector({
				calendarUI: {
					isModalOpen: true,
					modalData: { mode: "create" },
				},
				calendarEvent: { events: [] },
			}),
		);

		render(<CalendarWrapper />);

		expect(screen.getByTestId("calendar-content")).toBeInTheDocument();
		expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
	});

	it("should render modal in edit mode with selected event", () => {
		const mockEvent = {
			id: "abc123",
			title: "Meeting",
			description: "Discuss project",
			start: "2023-05-01",
			end: "2023-05-02",
		};
		(useAppSelector as Mock).mockImplementation((selector: any) =>
			selector({
				calendarUI: {
					isModalOpen: true,
					modalData: { mode: "edit", eventId: "abc123" },
				},
				calendarEvent: { events: [mockEvent] },
			}),
		);

		render(<CalendarWrapper />);

		expect(screen.getByTestId("calendar-content")).toBeInTheDocument();
		expect(screen.getByText("Save Event")).toBeInTheDocument();
	});

	it("should dispatch deleteEvent on footer action click", () => {
		mockDispatch.mockClear();

		const mockEvent = { id: "abc123", title: "Meeting" };

		(useAppSelector as Mock).mockImplementation((selectorFn: any) =>
			selectorFn({
				calendarUI: {
					isModalOpen: true,
					modalData: { mode: "edit", eventId: "abc123" },
				},
				calendarEvent: { events: [mockEvent] },
			}),
		);

		render(<CalendarWrapper />);

		const deleteButton = screen.getByText("Delete");
		deleteButton.click();

		expect(mockDispatch).toHaveBeenCalledWith({ type: "calendarEvent/deleteEvent", payload: "abc123" });
	});
});
