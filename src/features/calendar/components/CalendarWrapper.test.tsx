import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CalendarWrapper } from "./CalendarWrapper";

vi.mock("@/app/useAppSelector", () => ({
	useAppSelector: vi.fn(() => ({
		isModalOpen: false,
		modalData: null,
	})),
}));

vi.mock("@/app/useAppDispatch", () => ({
	useAppDispatch: () => vi.fn(),
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
	it("should render calendar wrapper with sidebar, content, and calendar", () => {
		render(<CalendarWrapper />);

		expect(screen.getByTestId("calendar-wrapper")).toBeInTheDocument();
		expect(screen.getByTestId("calendar-sidebar")).toBeInTheDocument();
		expect(screen.getByTestId("calendar-content")).toBeInTheDocument();
		expect(screen.getByTestId("calendar")).toBeInTheDocument();
	});
});
