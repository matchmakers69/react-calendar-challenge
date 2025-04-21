import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EventLabelsColorPicker } from "./EventLabelsColorPicker";

const mockLabels = [
	{ id: "red", label: "bg-red-500" },
	{ id: "blue", label: "bg-blue-500" },
	{ id: "green", label: "bg-green-500" },
];

describe("<EventLabelsColorPicker />", () => {
	it("should render all color buttons", () => {
		const mockFn = vi.fn();
		render(<EventLabelsColorPicker eventColorLabels={mockLabels} onSelect={mockFn} selectedColor="" />);

		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(mockLabels.length);
	});

	it("should call onSelect with the correct color when clicked", () => {
		const mockFn = vi.fn();
		render(<EventLabelsColorPicker eventColorLabels={mockLabels} onSelect={mockFn} selectedColor="" />);

		const redButton = screen.getByRole("button", {
			name: /select color: bg-red-500/i,
		});
		fireEvent.click(redButton);
		expect(mockFn).toHaveBeenCalledWith("bg-red-500");
	});

	it("should apply selected styling to the selected color", () => {
		const mockFn = vi.fn();
		render(
			<EventLabelsColorPicker eventColorLabels={mockLabels} onSelect={mockFn} selectedColor="bg-blue-500" />,
		);

		const selectedButton = screen.getByRole("button", {
			name: /select color: bg-blue-500 \(selected\)/i,
		});

		expect(selectedButton).toHaveClass("ring-2 ring-black");
	});
});
