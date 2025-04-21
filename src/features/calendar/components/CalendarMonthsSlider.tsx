import { useAppDispatch } from "@/app/useAppDispatch";
import { useAppSelector } from "@/app/useAppSelector";
import { Button, IndicatorButton } from "@/shared/components";
import { formatMonthHeader } from "@/utils";
import { t } from "@/shared/locales";
import { toggleSidebar } from "../slices";

type CalendarMonthsSliderProps = {
	currentDate: Date;
	onPrevMonth: () => void;
	onNextMonth: () => void;
	onResetToToday?: () => void;
};

function CalendarMonthsSlider({
	currentDate,
	onPrevMonth,
	onNextMonth,
	onResetToToday,
}: CalendarMonthsSliderProps) {
	const { isSidebarOpen } = useAppSelector((state) => state.calendarUI);
	const dispatch = useAppDispatch();
	const handleTogglrSidebar = () => {
		dispatch(toggleSidebar());
	};
	return (
		<div className="flex flex-col items-end lg:flex-row lg:justify-between lg:items-center px-8 mb-14">
			<div className="flex gap-4 mb-8 lg:mb-0">
				<Button variant="outline" size="sm" onClick={onResetToToday}>
					{t.calendar.today}
				</Button>

				<Button
					className="border-valencian-orange text-valencian-orange lg:hidden hover:border-black"
					variant="outline"
					size="sm"
					onClick={handleTogglrSidebar}
				>
					{isSidebarOpen ? `${t.calendar.hideSidebar}` : `${t.calendar.showSidebar}`}
				</Button>
			</div>
			<div className="flex gap-6 items-center">
				<IndicatorButton size="square" direction="left" onClick={onPrevMonth} />
				<h2 className="text-[1.8rem] md:text-[2rem] lg:text-[2.2rem] font-bold uppercase tracking-wider">
					{formatMonthHeader(currentDate)}
				</h2>
				<IndicatorButton size="square" direction="right" onClick={onNextMonth} />
			</div>
		</div>
	);
}
export { CalendarMonthsSlider };
