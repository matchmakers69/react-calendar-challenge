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
				<div className="flex-1 flex flex-col gap-1 sm:gap-1.5">
					{cell.events.map((event) => (
						<div
							key={event.id}
							role="button"
							aria-label={`Event ${event.title}`}
							tabIndex={0}
							className="text-white cursor-pointer text-xs lg:text-sm font-semibold py-4 px-1  bg-opacity-90"
							style={{
								backgroundColor: event.categoryLabelColor,
							}}
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
							<p className="truncate text-center [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]">
								{event.title}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export { CalendarDay };
// writing-mode-vertical text-orientation-upright md:writing-mode-horizontal md:text-orientation-mixed
