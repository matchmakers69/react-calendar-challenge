import { EventColor } from "../types";

type EventLabelsColorPickerProps = {
	eventColorLabels: EventColor[];
	onSelect: (color: string) => void;
	selectedColor?: string;
};

function EventLabelsColorPicker({ eventColorLabels, onSelect, selectedColor }: EventLabelsColorPickerProps) {
	return (
		<div className="flex items-center gap-4">
			{eventColorLabels.map(({ id, label }) => {
				const isSelected = selectedColor === label;

				return (
					<button
						key={id}
						type="button"
						onClick={() => onSelect(label)}
						className={`w-10 h-10 rounded-full cursor-pointer focus:outline-none focus:ring focus:ring-offset focus:ring-blue-500 ${label} ${
							isSelected ? "ring-2 ring-black" : "border border-light-grey"
						}`}
						aria-label={`Select color: ${label} ${isSelected ? "(selected)" : ""}`}
					>
						<span className="sr-only">
							Select color: {label} {isSelected ? "(selected)" : ""}
						</span>
					</button>
				);
			})}
		</div>
	);
}

export { EventLabelsColorPicker };
