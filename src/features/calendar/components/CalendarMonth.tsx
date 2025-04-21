import { Fragment } from "react";

import { CalendarDay } from "./CalendarDay";
import { CalendarCell, CalendarEvent } from "../types";

type CalendarMonthProps = {
	calendarCells: CalendarCell[][];
	onEditEvent: (event: CalendarEvent) => void;
};

function CalendarMonth({ calendarCells, onEditEvent }: CalendarMonthProps) {
	return (
		<>
			{calendarCells.map((week, rowIndex) => (
				<Fragment key={rowIndex}>
					{week.map((cell) => (
						<CalendarDay key={cell.date.toDateString()} cell={cell} onEditEvent={onEditEvent} />
					))}
				</Fragment>
			))}
		</>
	);
}
export { CalendarMonth };
