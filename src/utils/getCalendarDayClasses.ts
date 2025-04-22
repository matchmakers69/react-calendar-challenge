import { CalendarCell } from "@/features/calendar/types/CalendarCell";

function getCalendarDayClasses(cell: CalendarCell): string {
	const baseClasses = ["calendar-cell", "relative", "text-sm", "overflow-hidden", "flex", "flex-col"];

	if (cell.isToday) {
		baseClasses.push("bg-light-green", "text-black");
	} else if (!cell.isCurrentMonth) {
		baseClasses.push("text-gray-400", "bg-light-grey");
	} else {
		baseClasses.push("bg-white", "text-black");
	}

	return baseClasses.join(" ");
}

export { getCalendarDayClasses };
