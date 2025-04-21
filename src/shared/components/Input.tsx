import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type FormInputProps = {
	label?: string;
	placeholder?: string;
	error?: { message?: string };
} & InputProps;

function InputField(
	{ className, type, label, error, placeholder, readOnly, min, ...props }: FormInputProps,
	ref: React.Ref<HTMLInputElement>,
) {
	const id = useId();

	return (
		<>
			{label && (
				<label
					htmlFor={id}
					className={`${props.disabled ? "opacity-15" : "opacity-100"} mb-2 block text-left text-[1.8rem] font-semibold leading-6`}
				>
					{label}
				</label>
			)}

			<div className={cn("w-full", error ? "relative" : "static")}>
				<input
					type={type}
					placeholder={placeholder}
					className={cn(
						"flex h-[4.5rem] w-full px-4 py-0 text-sm placeholder:opacity-40 focus:border-berry-blue focus:outline-none focus:ring-1 focus:ring-ring-dark disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
						error
							? "border-0 ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 "
							: "border border-dark-grey file:border-0 file:bg-transparent file:text-sm file:font-medium",
						readOnly ? "cursor-not-allowed opacity-50" : "",
						className,
					)}
					ref={ref}
					id={id}
					min={min}
					readOnly={readOnly}
					{...props}
				/>
				{error && <p className="mt-2 text-xs text-red-500">{error.message}</p>}
			</div>
		</>
	);
}

const Input = forwardRef(InputField);
Input.displayName = "Input";

export { Input };
