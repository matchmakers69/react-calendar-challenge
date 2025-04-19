import { ForwardedRef, forwardRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/tailwindMerge";
import { Button, ButtonProps } from "./Button";

interface IndicatorButtonProps extends Omit<ButtonProps, "variant"> {
	direction?: "left" | "right";
	label?: string;
}

function IndicatorButtonComponent(
	{ direction = "right", label = "", className, ...props }: IndicatorButtonProps,
	ref: ForwardedRef<HTMLButtonElement>,
) {
	return (
		<Button ref={ref} variant="indicator" aria-label={label} className={cn("gap-2", className)} {...props}>
			{direction === "left" && <ChevronLeft data-testid="arrow-left" aria-hidden="true" />}
			{label && <span className="text-sm">{label}</span>}
			{direction === "right" && <ChevronRight data-testid="arrow-right" aria-hidden="true" />}
		</Button>
	);
}

const IndicatorButton = forwardRef(IndicatorButtonComponent);
IndicatorButton.displayName = "IndicatorButton";
export { IndicatorButton };
