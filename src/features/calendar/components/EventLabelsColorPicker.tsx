import { t } from "@/shared/locales";
import { EventColor } from "../types";

type EventLabelsColorPickerProps = {
	eventColorLabels: EventColor[];
	onSelect: (color: string) => void;
	selectedColor?: string;
	["data-testid"]?: string;
};

function EventLabelsColorPicker({
	eventColorLabels,
	onSelect,
	selectedColor,
	"data-testid": dataTestid,
}: EventLabelsColorPickerProps) {
	return (
		<div className="flex items-center gap-4">
			{eventColorLabels.map(({ id, label }) => {
				const isSelected = selectedColor === label;

				return (
					<button
						key={id}
						type="button"
						data-testid={`${dataTestid}-${label}`}
						onClick={() => onSelect(label)}
						className={`w-10 h-10 rounded-full cursor-pointer focus:outline-none focus:ring focus:ring-offset focus:ring-blue-500 ${label} ${
							isSelected ? "ring-2 ring-black-500" : "border border-light-grey"
						}`}
						aria-label={`${t.form.eventForm.colorPicker.selectColor}: ${label} ${isSelected ? `(${t.form.eventForm.colorPicker.categoryColorSelected})` : ""}`}
					>
						<span className="sr-only">
							{t.form.eventForm.colorPicker.selectColor}: {label}{" "}
							{isSelected ? `(${t.form.eventForm.colorPicker.categoryColorSelected})` : ""}
						</span>
					</button>
				);
			})}
		</div>
	);
}

export { EventLabelsColorPicker };
