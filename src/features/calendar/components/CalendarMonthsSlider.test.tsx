/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { useAppSelector } from "@/app/useAppSelector";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { CalendarMonthsSlider } from "./CalendarMonthsSlider";

vi.mock("@/app/useAppDispatch", () => ({
	useAppDispatch: () => vi.fn(),
}));

vi.mock("@/app/useAppSelector", () => ({
	useAppSelector: vi.fn(),
}));

vi.mock("@/shared/components", () => ({
	Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
	IndicatorButton: ({ direction, onClick }: any) => (
		<button onClick={onClick} data-testid={`indicator-${direction}`}>
			{direction}
		</button>
	),
}));

vi.mock("@/utils", () => ({
	formatMonthHeader: (date: Date) => date.toDateString(),
}));

describe("<CalendarMonthsSlider />", () => {
	const onPrevMonth = vi.fn();
	const onNextMonth = vi.fn();
	const onResetToToday = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		(useAppSelector as Mock).mockImplementation((selector: any) =>
			selector({ calendarUI: { isSidebarOpen: false } }),
		);
	});

	it("should render with today's button and formatted month", () => {
		render(
			<CalendarMonthsSlider
				currentDate={new Date("2025-04-01")}
				onPrevMonth={onPrevMonth}
				onNextMonth={onNextMonth}
				onResetToToday={onResetToToday}
			/>,
		);

		expect(screen.getByText("Today")).toBeInTheDocument();
		expect(screen.getByText("Show Sidebar")).toBeInTheDocument();
		expect(screen.getByText("Tue Apr 01 2025")).toBeInTheDocument();
	});

	it("should call onPrevMonth and onNextMonth when navigation buttons are clicked", () => {
		render(
			<CalendarMonthsSlider
				currentDate={new Date()}
				onPrevMonth={onPrevMonth}
				onNextMonth={onNextMonth}
				onResetToToday={onResetToToday}
			/>,
		);

		fireEvent.click(screen.getByTestId("indicator-left"));
		expect(onPrevMonth).toHaveBeenCalled();

		fireEvent.click(screen.getByTestId("indicator-right"));
		expect(onNextMonth).toHaveBeenCalled();
	});

	it("should call onResetToToday when 'Today' button is clicked", () => {
		render(
			<CalendarMonthsSlider
				currentDate={new Date()}
				onPrevMonth={onPrevMonth}
				onNextMonth={onNextMonth}
				onResetToToday={onResetToToday}
			/>,
		);

		fireEvent.click(screen.getByText("Today"));
		expect(onResetToToday).toHaveBeenCalled();
	});

	it("should render 'Hide Sidebar' when isSidebarOpen is true", () => {
		(useAppSelector as Mock).mockImplementation((selector: any) =>
			selector({ calendarUI: { isSidebarOpen: true } }),
		);

		render(
			<CalendarMonthsSlider currentDate={new Date()} onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} />,
		);

		expect(screen.getByText("Hide Sidebar")).toBeInTheDocument();
	});
});
