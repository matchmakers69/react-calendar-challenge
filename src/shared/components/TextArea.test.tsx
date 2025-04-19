import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { TextArea } from "./TextArea";

describe("<Textarea />", () => {
	it("should render the textarea with a label and placeholder", () => {
		render(<TextArea label="Test Label" placeholder="Test Placeholder" />);
		expect(screen.getByText("Test Label")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
	});

	it("should apply error styles and displays error message when error prop is passed", () => {
		const errorMessage = "This field is required";
		render(<TextArea label="Test Label" placeholder="Test Placeholder" error={{ message: errorMessage }} />);
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
		const textarea = screen.getByPlaceholderText("Test Placeholder");
		expect(textarea).toHaveClass("ring-inset");
		expect(textarea).toHaveClass("ring-red-300");
	});

	it("should not apply error styles when there is no error", () => {
		render(<TextArea label="Test Label" placeholder="Test Placeholder" />);
		const textarea = screen.getByPlaceholderText("Test Placeholder");
		expect(textarea).toHaveClass("border-dark-grey");
		expect(textarea).not.toHaveClass("ring-inset");
	});

	it("should apply custom className correctly", () => {
		const customClass = "custom-class";
		render(<TextArea label="Test Label" placeholder="Test Placeholder" className={customClass} />);
		const textarea = screen.getByPlaceholderText("Test Placeholder");
		expect(textarea).toHaveClass(customClass);
	});

	it("should call onChange handler when text is typed", () => {
		const handleChange = vi.fn();
		render(<TextArea label="Test Label" placeholder="Test Placeholder" onChange={handleChange} />);

		const textarea = screen.getByPlaceholderText("Test Placeholder");
		fireEvent.change(textarea, { target: { value: "New text" } });

		expect(handleChange).toHaveBeenCalled();
	});
});
