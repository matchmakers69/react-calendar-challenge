import { Button } from "@/shared/components";
import { t } from "@/shared/locales";
import { RotateCcw, RotateCw } from "lucide-react";

type CalendarHeaderButtonControlsProps = {
	isSidebarOpen: boolean;
	handleToggleSidebar: () => void;
	onResetToToday: () => void;
	onUndo: () => void;
	onRedo: () => void;
	isUndoAvailable?: boolean;
	isRedoAvailable?: boolean;
};

function CalendarHeaderButtonControls({
	onResetToToday,
	isSidebarOpen,
	handleToggleSidebar,
	onUndo,
	onRedo,
	isUndoAvailable = false,
	isRedoAvailable = false,
}: CalendarHeaderButtonControlsProps) {
	return (
		<>
			<div className="flex gap-4 mb-8 lg:mb-0">
				<Button variant="outline" size="sm" onClick={onResetToToday}>
					{t.calendar.today}
				</Button>

				<Button
					className="border-valencian-orange text-valencian-orange lg:hidden hover:border-black"
					variant="outline"
					size="sm"
					onClick={handleToggleSidebar}
				>
					{isSidebarOpen ? `${t.calendar.hideSidebar}` : `${t.calendar.showSidebar}`}
				</Button>
				<div className="flex items-center gap-4 ml-4 md:ml-6">
					<Button
						title="Undo"
						data-testid="undo-button"
						onClick={onUndo}
						aria-label="Undo last action"
						className="bg-light-grey"
						variant="indicator"
						disabled={!isUndoAvailable}
						size="square"
					>
						<RotateCcw />
					</Button>
					<Button
						aria-label="Redo last undone action"
						title="Redo"
						className="bg-light-grey"
						variant="indicator"
						size="square"
						disabled={!isRedoAvailable}
						onClick={onRedo}
						data-testid="redo-button"
					>
						<RotateCw />
					</Button>
				</div>
			</div>
		</>
	);
}

export { CalendarHeaderButtonControls };
