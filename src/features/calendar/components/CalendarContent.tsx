import { t } from "@/shared/locales";
import { BaseProps } from "@/shared/types";

export type CalendarContentProps = BaseProps;

function CalendarContent({ children, "data-testid": dataTestid }: CalendarContentProps) {
	return (
		<main data-testid={dataTestid} className="flex flex-1 flex-col lg:min-w-0 lg:pl-[25rem] pt-8">
			<h1 className="text-black text-[2rem] md:text-[2.6rem] lg:text-[2.8rem] px-8 mb-14 uppercase font-extrabold">
				{t.calendar.mainSlogan}
			</h1>
			{children}
		</main>
	);
}
export { CalendarContent };
