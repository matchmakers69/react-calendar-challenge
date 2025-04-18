import { forwardRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/tailwindMerge";
import { Button, ButtonProps } from "./Button";

interface IndicatorButtonProps extends Omit<ButtonProps, "variant"> {
	direction?: "left" | "right";
	label?: string;
}

export const IndicatorButton = forwardRef<HTMLButtonElement, IndicatorButtonProps>(
	({ direction = "right", label = "", className, ...props }, ref) => {
		return (
			<Button ref={ref} variant="indicator" aria-label={label} className={cn("gap-2", className)} {...props}>
				{direction === "left" && <ChevronLeft data-testid="arrow-left" aria-hidden="true" />}
				{label && <span className="text-sm">{label}</span>}
				{direction === "right" && <ChevronRight data-testid="arrow-right" aria-hidden="true" />}
			</Button>
		);
	},
);

IndicatorButton.displayName = "IndicatorButton";
