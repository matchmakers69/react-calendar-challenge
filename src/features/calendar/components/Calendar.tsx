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
import { openModal } from "../slices";

type CalendarProps = BaseProps;

function Calendar({ "data-testid": dataTestid }: CalendarProps) {
	const [currentDate, setCurrentDate] = useState(getToday());
	const { isLoadingEvents, isError, events } = useFetchCalendarEvents();
	const dispatch = useAppDispatch();

	const handleOpenModalEdit = (event: CalendarEvent) => {
		dispatch(
			openModal({
				mode: "edit",
				date: new Date(event.start).toISOString(),
				eventId: event.id,
			}),
		);
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

	const calendarCells = useCalendarCells(currentDate, events || []);

	return (
		<div className="calendar flex flex-col flex-1 overflow-hidden" data-testid={dataTestid}>
			<header className="calendar-header">
				<CalendarMonthsSlider
					currentDate={currentDate}
					onPrevMonth={handlePrevMonth}
					onNextMonth={handleNextMonth}
					onResetToToday={handleResetToToday}
				/>
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
