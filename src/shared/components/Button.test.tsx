import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
const getButton = () => screen.getByRole("button");

describe("<Button />", () => {
	it("should render with default props", () => {
		render(<Button>Click me</Button>);
		const button = getButton();
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Click me");
		expect(button).toHaveAttribute("type", "button");
	});

	it("should support the 'type' prop", () => {
		render(<Button type="submit">Submit</Button>);
		expect(getButton()).toHaveAttribute("type", "submit");
	});

	it("is disabled when 'disabled' prop is true", () => {
		render(<Button disabled>Can't click me</Button>);
		const button = getButton();
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute("aria-disabled", "true");
	});

	it("should call onClick when clicked", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click</Button>);
		await user.click(getButton());
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should apply correct variant class", () => {
		render(<Button variant="primary">Primary</Button>);
		const button = getButton();
		expect(button.className).toMatch(/bg-broccoli-green/);
	});

	it("should apply correct size class", () => {
		render(<Button size="square">A</Button>);
		const button = getButton();
		expect(button.className).toMatch(/w-\[44px\]/);
	});

	it("should merge additional class names", () => {
		render(<Button className="custom-class">Styled</Button>);
		const button = getButton();
		expect(button.className).toMatch(/custom-class/);
	});
});
