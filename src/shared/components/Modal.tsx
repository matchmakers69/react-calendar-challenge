import { ReactElement, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { BaseProps } from "../types";
import { Button } from "./Button";

type ModalProps = {
	isOpen?: boolean;
	onClose: () => void;
	title?: string;
	footer?: ReactElement;
	actionLabel: string;
	disabled?: boolean;
	footerAction?: () => void;
	footerActionLabel?: string;
} & BaseProps;

function Modal({
	isOpen,
	onClose,
	title,
	footer,
	disabled,
	footerAction,
	footerActionLabel,
	children,
}: ModalProps) {
	const [isModalShown, setIsModalShown] = useState(isOpen);

	useEffect(() => {
		setIsModalShown(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setIsModalShown(false);
		onClose();
	}, [disabled, onClose]);

	const handleFooterAction = useCallback(() => {
		if (disabled || !footerAction) {
			return;
		}
		footerAction();
	}, [disabled, footerAction]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none">
				<div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5 2xl:w-1/3">
					<div
						className={`translate h-full duration-300 
            ${isModalShown ? "translate-y-0" : "translate-y-full"} 
            ${isModalShown ? "opacity-100" : "opacity-0"}`}
					>
						<div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
							<header className="relative flex items-center justify-center rounded-t p-4">
								<button
									aria-label="Close Modal"
									onClick={handleClose}
									className="absolute flex flex-col w-[3.5rem] h-[3.5rem] items-center justify-center border-dark-grey cursor-pointer right-9 border-2 p-1 transition hover:opacity-70"
									type="button"
								>
									<X />
								</button>
								<div className="text-lg font-semibold">{title}</div>
							</header>
							<div className="relative flex-auto p-6">{children}</div>
							<footer className="flex flex-col bg-light-grey p-4 gap-4 rounded-b-lg">
								<div className="flex w-full  flex-row items-center gap-8 justify-end">
									{footerAction && footerActionLabel && (
										<Button type="button" variant="destructive" size="sm" onClick={handleFooterAction}>
											{footerActionLabel}
										</Button>
									)}
									{footer}
								</div>
							</footer>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export { Modal };
