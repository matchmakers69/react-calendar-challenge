import { formatDay, getCalendarDayClasses } from "@/utils";
import { CalendarCell, CalendarEvent } from "../types";

type CalendarDayProps = {
	cell: CalendarCell;
	onEditEvent: (event: CalendarEvent) => void;
};

function CalendarDay({ cell, onEditEvent }: CalendarDayProps) {
	return (
		<div
			aria-current={cell.isToday ? "date" : undefined}
			aria-disabled={!cell.isCurrentMonth}
			aria-label={`Day ${formatDay(cell.date)}${cell.events.length ? ` with ${cell.events.length} events` : ""}`}
			className={`border border-light-grey ${getCalendarDayClasses(cell)}`}
		>
			<div className="flex flex-col flex-wrap">
				<header className="flex flex-col items-center justify-center h-[3.5rem]">
					<span className="day-number text-center font-bold">{formatDay(cell.date)}</span>
				</header>
				<div className="flex-1">
					{cell.events.map((event) => (
						<div
							key={event.id}
							role="button"
							aria-label={`Event ${event.title}`}
							tabIndex={0}
							className="truncate text-white text-xs font-semibold  py-0.5 rounded"
							style={{ backgroundColor: event.label }}
							onClick={(e) => {
								e.stopPropagation();
								onEditEvent(event);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									onEditEvent(event);
								}
							}}
						>
							<p className="p-2 text-xs leading-tight line-clamp-4">{event.title}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export { CalendarDay };
