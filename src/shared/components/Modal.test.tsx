import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

const onCloseMock = vi.fn();

describe("Modal", () => {
	const defaultProps = {
		isOpen: true,
		onClose: onCloseMock,
		title: "Test Modal",
		actionLabel: "Submit",
		children: <div>Modal Content</div>,
		footer: <button>Footer Action</button>,
	};

	it("should render when isOpen is true", () => {
		render(<Modal {...defaultProps} />);
		expect(screen.getByText("Test Modal")).toBeInTheDocument();
		expect(screen.getByText("Modal Content")).toBeInTheDocument();
		expect(screen.getByText("Footer Action")).toBeInTheDocument();
	});

	it("should not render when isOpen is false", () => {
		render(<Modal {...defaultProps} isOpen={false} />);
		expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
	});

	it("should call onClose when close (X) button is clicked", async () => {
		render(<Modal {...defaultProps} />);
		const closeButton = screen.getByLabelText("Close Modal");
		fireEvent.click(closeButton);
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});
});
