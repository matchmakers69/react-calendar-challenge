import { Logo } from "@/shared/components";
import { SidebarFooterText } from "./SidebarFooterText";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components";
import { useAppSelector } from "@/app/useAppSelector";
import { BaseProps } from "@/shared/types";
import { t } from "@/shared/locales";
import { useAppDispatch } from "@/app/useAppDispatch";
import { openModal } from "../slices";

export type CalendarSidebarProps = BaseProps;

function CalendarSidebar({ "data-testid": dataTestid }: CalendarSidebarProps) {
	const { isSidebarOpen } = useAppSelector((state) => state.calendarUI);
	const dispatch = useAppDispatch();

	const handleOpenModalCreate = () => {
		dispatch(
			openModal({
				mode: "create",
			}),
		);
	};
	return (
		<aside
			data-testid={dataTestid}
			className={`fixed inset-y-0 left-0 z-40 w-[25rem] bg-light-green border-black flex-shrink-0 border-r border-dark-border bg-sidebar-grey transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
		>
			<nav className="flex h-full min-h-0 flex-col">
				<div className="flex p-8 flex-col border-b border-dark-border">
					<div className="flex flex-col justify-center items-center gap-4">
						<Logo />
						<span className="text-sm font-normal uppercase text-dark-grey">{t.calendar.title}</span>
					</div>
				</div>
				<div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-8">
					<Button className="gap-2" onClick={handleOpenModalCreate} variant="primary" size="full">
						{t.sidebar.addEvent}
						<Plus />
					</Button>
				</div>
				<footer className="flex flex-col border-t border-dark-border p-8">
					<SidebarFooterText businessName={t.sidebar.copyrightCompanyTitle} />
				</footer>
			</nav>
		</aside>
	);
}
export { CalendarSidebar };
