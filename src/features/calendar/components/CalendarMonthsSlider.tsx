import { IndicatorButton } from "@/shared/components";
import { formatMonthHeader } from "@/utils";

type CalendarMonthsSliderProps = {
	currentDate: Date;
	onPrevMonth: () => void;
	onNextMonth: () => void;
};

function CalendarMonthsSlider({ currentDate, onPrevMonth, onNextMonth }: CalendarMonthsSliderProps) {
	return (
		<>
			<div className="flex gap-6 items-center">
				<IndicatorButton size="square" direction="left" onClick={onPrevMonth} />
				<h2 className="text-[1.8rem] md:text-[2rem] lg:text-[2.2rem] font-bold uppercase tracking-wider">
					{formatMonthHeader(currentDate)}
				</h2>
				<IndicatorButton size="square" direction="right" onClick={onNextMonth} />
			</div>
		</>
	);
}
export { CalendarMonthsSlider };
