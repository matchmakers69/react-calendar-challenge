import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { CalendarHeaderButtonControls } from "./CalendarHeaderButtonControls";

describe("<CalendarHeaderButtonControls />", () => {
	it("should render the 'Today' button", () => {
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={() => {}}
			/>,
		);

		expect(screen.getByRole("button", { name: "Today" })).toBeInTheDocument();
	});

	it("should render 'Show Sidebar' when sidebar is closed", () => {
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={() => {}}
			/>,
		);

		expect(screen.getByRole("button", { name: "Show Sidebar" })).toBeInTheDocument();
	});

	it("should render 'Hide Sidebar' when sidebar is open", () => {
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={true}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={() => {}}
			/>,
		);

		expect(screen.getByRole("button", { name: "Hide Sidebar" })).toBeInTheDocument();
	});

	it("should call 'onResetToToday' when 'Today' button is clicked", () => {
		const onResetToTodayMock = vi.fn();
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={onResetToTodayMock}
				onRedo={() => {}}
				onUndo={() => {}}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Today" }));
		expect(onResetToTodayMock).toHaveBeenCalled();
	});

	it("should call 'handleToggleSidebar' when sidebar toggle button is clicked", () => {
		const handleToggleSidebarMock = vi.fn();
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={handleToggleSidebarMock}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={() => {}}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Show Sidebar" }));
		expect(handleToggleSidebarMock).toHaveBeenCalled();
	});
	it("should render 'Undo' button as enabled when undo is available", () => {
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={() => {}}
				isUndoAvailable={true}
			/>,
		);

		expect(screen.getByTestId("undo-button")).not.toBeDisabled();
	});

	it("should render 'Undo' button as disabled when undo is not available", () => {
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={() => {}}
				isUndoAvailable={false}
			/>,
		);

		expect(screen.getByTestId("undo-button")).toBeDisabled();
	});

	it("should call 'onUndo' when 'Undo' button is clicked", () => {
		const onUndoMock = vi.fn();
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={onUndoMock}
				isUndoAvailable={true}
			/>,
		);

		fireEvent.click(screen.getByTestId("undo-button"));
		expect(onUndoMock).toHaveBeenCalled();
	});

	it("should render 'Redo' button as enabled when redo is available", () => {
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={() => {}}
				isRedoAvailable={true}
			/>,
		);

		expect(screen.getByTestId("redo-button")).not.toBeDisabled();
	});

	it("should render 'Redo' button as disabled when redo is not available", () => {
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={() => {}}
				onUndo={() => {}}
				isRedoAvailable={false}
			/>,
		);

		expect(screen.getByTestId("redo-button")).toBeDisabled();
	});

	it("should call 'onRedo' when 'Redo' button is clicked", () => {
		const onRedoMock = vi.fn();
		render(
			<CalendarHeaderButtonControls
				isSidebarOpen={false}
				handleToggleSidebar={() => {}}
				onResetToToday={() => {}}
				onRedo={onRedoMock}
				onUndo={() => {}}
				isRedoAvailable={true}
			/>,
		);

		fireEvent.click(screen.getByTestId("redo-button"));
		expect(onRedoMock).toHaveBeenCalled();
	});
});
