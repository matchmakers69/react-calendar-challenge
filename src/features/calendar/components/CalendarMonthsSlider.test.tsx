/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CalendarMonthsSlider } from "./CalendarMonthsSlider";

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

	it("should call onPrevMonth and onNextMonth when navigation buttons are clicked", () => {
		render(
			<CalendarMonthsSlider currentDate={new Date()} onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} />,
		);

		fireEvent.click(screen.getByTestId("indicator-left"));
		expect(onPrevMonth).toHaveBeenCalled();

		fireEvent.click(screen.getByTestId("indicator-right"));
		expect(onNextMonth).toHaveBeenCalled();
	});
});
