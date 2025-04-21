import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, TextArea } from "@/shared/components";
import { t } from "@/shared/locales";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components";
import { formatForDatetimeLocal, formattedCurrentDate, normalizeDateTime } from "@/utils";
import { EventLabelsColorPicker } from "./EventLabelsColorPicker";
import { EVENT_COLORS } from "../constants";
import { eventColorLabelMapper } from "../utils";
import { eventAddSchema, eventEditSchema, EventFormValues } from "../schemas";

type EventFormProps = {
	mode: "create" | "edit";
	initialValues?: Partial<EventFormValues> & { id?: string };
	onSubmit: (data: EventFormValues) => void;
};

const DEFAULT_LABEL_COLOR = "#3b7a57";

function EventForm({ mode, initialValues, onSubmit }: EventFormProps) {
	const schema = mode === "edit" ? eventEditSchema : eventAddSchema;
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm<EventFormValues>({
		resolver: zodResolver(schema),
		mode: "all",
		defaultValues: {
			title: "",
			description: "",
			start: "",
			end: "",
			categoryLabelColor: "",
		},
	});

	useEffect(() => {
		if (initialValues) {
			reset({
				...initialValues,
				start: formatForDatetimeLocal(initialValues.start),
				end: formatForDatetimeLocal(initialValues.end),
				categoryLabelColor: initialValues.categoryLabelColor || DEFAULT_LABEL_COLOR,
			});
		}
	}, [initialValues, reset]);

	const handleSelectColor = (color: string) => {
		setValue("categoryLabelColor", color, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	const onEventSubmit = (data: EventFormValues) => {
		// TODO in real app, it should be an API call async call
		const categoryLabelColor =
			eventColorLabelMapper[data.categoryLabelColor as keyof typeof eventColorLabelMapper];

		const eventData = {
			id: mode === "edit" && initialValues?.id ? initialValues.id : uuidv4(),
			title: data.title,
			description: data.description,
			start: normalizeDateTime(data.start),
			end: normalizeDateTime(data.end),
			categoryLabelColor: categoryLabelColor || getValues("categoryLabelColor"),
		};
		onSubmit(eventData);
	};

	return (
		<form className="w-full" noValidate onSubmit={handleSubmit(onEventSubmit)}>
			<div className="field-separator mb-10">
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							label="Title"
							placeholder={t.form.eventForm.placeholderTitle}
							error={errors.title ? { message: errors.title.message } : undefined}
						/>
					)}
				/>
			</div>

			<div className="field-separator mb-10">
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<TextArea
							{...field}
							rows={4}
							cols={50}
							label="Description"
							placeholder={t.form.eventForm.placeholderDescription}
							error={errors.description ? { message: errors.description.message } : undefined}
						/>
					)}
				/>
			</div>
			<div className="field-separator flex flex-col md:flex-row w-full items-center justify-between gap-8 md:gap-6 mb-10">
				<div className="w-full md:w-1/2">
					<Controller
						name="start"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								type="datetime-local"
								label="Start Time"
								placeholder="Select start time"
								min={formattedCurrentDate}
								error={errors.start ? { message: errors.start.message } : undefined}
							/>
						)}
					/>
				</div>
				<div className="w-full md:w-1/2">
					<Controller
						name="end"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								type="datetime-local"
								label="End Time"
								placeholder="Select end time"
								error={errors.end ? { message: errors.end.message } : undefined}
							/>
						)}
					/>
				</div>
			</div>
			<div className="field-separator">
				<label
					className="block text-left text-[1.8rem] font-semibold leading-6 mb-4"
					htmlFor="categoryLabelColor"
				>
					{t.form.eventForm.categoryLabelColor}
				</label>
				<Controller
					name="categoryLabelColor"
					control={control}
					render={({ field }) => (
						<EventLabelsColorPicker
							{...field}
							onSelect={handleSelectColor}
							data-testid="color"
							selectedColor={field.value || DEFAULT_LABEL_COLOR}
							eventColorLabels={EVENT_COLORS}
						/>
					)}
				/>
				{errors.categoryLabelColor && (
					<p className="mt-2 text-xs text-red-500">{errors.categoryLabelColor.message}</p>
				)}
			</div>

			<div className="mt-14 button-wrapper">
				<Button disabled={isSubmitting || !isValid || !isDirty} type="submit" variant="secondary" size="sm">
					{mode === "edit" ? t.form.eventForm.saveEvent : t.form.eventForm.createEvent}
				</Button>
			</div>
		</form>
	);
}
export { EventForm };
