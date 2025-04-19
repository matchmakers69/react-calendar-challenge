import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("<Input />", () => {
	it("should render with a label", () => {
		render(<Input label="Username" name="username" />);
		expect(screen.getByLabelText("Username")).toBeInTheDocument();
	});

	it("should render without a label", () => {
		render(<Input name="email" />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("should show placeholder text", () => {
		render(<Input placeholder="Enter name" name="name" />);
		expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
	});

	it("should show error message when error prop is passed", () => {
		render(<Input label="Email" name="email" error={{ message: "Email is required" }} />);
		expect(screen.getByText("Email is required")).toBeInTheDocument();
	});

	it("should render with disabled prop", () => {
		render(<Input name="disabled-input" disabled />);
		expect(screen.getByRole("textbox")).toBeDisabled();
	});

	it("should render as read-only when readOnly prop is set", () => {
		render(<Input name="readonly-input" readOnly />);
		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("readonly");
	});

	it("should call onChange when user types", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<Input name="test" onChange={handleChange} />);
		const input = screen.getByRole("textbox");

		await user.type(input, "hello");
		expect(handleChange).toHaveBeenCalled();
	});
});
