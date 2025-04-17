import { ReactNode } from "react";

export type BaseProps<T = ReactNode> = {
	className?: string;
	children?: T;
	["data-testid"]?: string;
};
