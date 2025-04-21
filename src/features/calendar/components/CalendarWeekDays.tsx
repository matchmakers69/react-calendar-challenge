import { formatWeekDay, getWeekDays, today } from "@/utils";

function CalendarWeekDays() {
	const weekDays = getWeekDays(today);
	return (
		<div className="grid grid-cols-7 week-day">
			{weekDays.map(({ currentDate }) => (
				<div key={currentDate.toISOString()}>
					<span className="block lg:hidden text-center font-bold uppercase tracking-wider mb-6">
						{formatWeekDay(currentDate, "EE")}
					</span>
					<span className="hidden lg:block text-center font-bold uppercase tracking-wider mb-6">
						{formatWeekDay(currentDate, "EEEE")}
					</span>
				</div>
			))}
		</div>
	);
}
export { CalendarWeekDays };
