import { useState } from "react";
import { getNextMonth, getPreviousMonth, getToday } from "@/utils";
import { CalendarWeekDays } from "./CalendarWeekDays";
import { useCalendarCells, useFetchCalendarEvents } from "../hooks";
import { CalendarEvent } from "../types";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarMonthsSlider } from "./CalendarMonthsSlider";
import { BaseProps } from "@/shared/types";
import { useAppDispatch } from "@/app/useAppDispatch";
import { t } from "@/shared/locales";
import { openModal, redo, toggleSidebar, undo } from "../slices";
import { CalendarHeaderButtonControls } from "./CalendarHeaderButtonControls";
import { useAppSelector } from "@/app/useAppSelector";

type CalendarProps = BaseProps;

function Calendar({ "data-testid": dataTestid }: CalendarProps) {
	const [currentDate, setCurrentDate] = useState(getToday());
	const { isLoadingEvents, isError, events } = useFetchCalendarEvents();
	const { isSidebarOpen } = useAppSelector((state) => state.calendarUI);
	const { past, future } = useAppSelector((state) => state.calendarEvent);

	const dispatch = useAppDispatch();

	const isUndoAvailable = past.length > 0;
	const isRedoAvailable = future.length > 0;

	const handleOpenModalEdit = (event: CalendarEvent) => {
		dispatch(openModal({ mode: "edit", eventId: event.id, date: new Date().toISOString() }));
	};

	const handlePrevMonth = () => {
		setCurrentDate((prev) => getPreviousMonth(prev, 1));
	};

	const handleNextMonth = () => {
		setCurrentDate((prev) => getNextMonth(prev, 1));
	};

	const handleResetToToday = () => {
		setCurrentDate(getToday());
	};

	const handleToggleSidebar = () => {
		dispatch(toggleSidebar());
	};

	const handleUndo = () => {
		dispatch(undo());
	};

	const handleRedo = () => {
		dispatch(redo());
	};

	const calendarCells = useCalendarCells(currentDate, events || []);

	return (
		<div className="calendar flex flex-col flex-1 overflow-hidden" data-testid={dataTestid}>
			<header className="calendar-header">
				<div className="flex flex-col items-end lg:flex-row lg:justify-between lg:items-center px-8 mb-14">
					<CalendarHeaderButtonControls
						isSidebarOpen={isSidebarOpen}
						handleToggleSidebar={handleToggleSidebar}
						onResetToToday={handleResetToToday}
						onUndo={handleUndo}
						onRedo={handleRedo}
						isUndoAvailable={isUndoAvailable}
						isRedoAvailable={isRedoAvailable}
					/>
					<CalendarMonthsSlider
						currentDate={currentDate}
						onPrevMonth={handlePrevMonth}
						onNextMonth={handleNextMonth}
					/>
				</div>
				<CalendarWeekDays />
			</header>

			{isLoadingEvents && <div className="text-center py-4">{t.calendar.loadingEvents}</div>}

			{isError && <div className="text-center text-red-500 py-4">{t.calendar.error}</div>}

			{!isLoadingEvents && !isError && (
				<div className="grid grid-cols-7 grid-rows-6 flex-1 overflow-y-auto">
					<CalendarMonth calendarCells={calendarCells} onEditEvent={handleOpenModalEdit} />
				</div>
			)}
		</div>
	);
}

export { Calendar };
