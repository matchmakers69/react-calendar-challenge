import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IndicatorButton } from "./IndicatorButton";

describe("<IndicatorButton />", () => {
	it("should render with label Previous and left arrow", () => {
		render(
			<IndicatorButton label="Previous" direction="left">
				Previous
			</IndicatorButton>,
		);
		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(screen.getByText("Previous")).toBeVisible();
		expect(screen.getByTestId("arrow-left")).toBeInTheDocument();
	});

	it("should render with right arrow", () => {
		render(<IndicatorButton direction="right">Next</IndicatorButton>);
		expect(screen.getByTestId("arrow-right")).toBeInTheDocument();
	});

	it("should apply aria-disabled when disabled", () => {
		render(
			<IndicatorButton direction="right" disabled>
				Next
			</IndicatorButton>,
		);
		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-disabled", "true");
		expect(button).toBeDisabled();
	});

	it("should call onClick handler when clicked", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(
			<IndicatorButton direction="left" onClick={handleClick}>
				Click me
			</IndicatorButton>,
		);
		await user.click(screen.getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
