import { ComponentPropsWithRef, forwardRef, useId } from "react";
import { cn } from "@/utils";

export type FormTextareaProps = {
	label?: string;
	placeholder?: string;
	error?: { message?: string };
} & ComponentPropsWithRef<"textarea">;

function TextareaField(
	{ className, label, error, placeholder, readOnly, ...props }: FormTextareaProps,
	ref: React.Ref<HTMLTextAreaElement>,
) {
	const id = useId();

	return (
		<div>
			{label && (
				<label
					htmlFor={id}
					className={`${props.disabled ? "opacity-15" : "opacity-100"} mb-2 block text-left text-[1.8rem] font-semibold leading-6`}
				>
					{label}
				</label>
			)}

			<div className={cn("w-full", error ? "relative" : "static")}>
				<textarea
					id={id}
					placeholder={placeholder}
					className={cn(
						"w-full resize-none px-4 py-2 text-sm placeholder:opacity-40 focus:border-berry-blue focus:outline-none focus:ring-1 focus:ring-ring-dark disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
						error
							? "border-0 ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
							: "border border-dark-grey",
						readOnly ? "cursor-not-allowed opacity-50" : "",
						className,
					)}
					readOnly={readOnly}
					ref={ref}
					{...props}
				/>
				{error?.message && <p className="mt-2 text-xs text-red-500">{error.message}</p>}
			</div>
		</div>
	);
}

const TextArea = forwardRef(TextareaField);
TextArea.displayName = "TextArea";
export { TextArea };
