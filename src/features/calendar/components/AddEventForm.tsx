import { useForm, Controller } from "react-hook-form";
import { Input, TextArea } from "@/shared/components";
import { t } from "@/shared/locales";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEventValidationSchema } from "../schemas/addEventValidationSchema";
import { Button } from "@/shared/components";
import { formattedCurrentDate, normalizeDateTime } from "@/utils";
import { EventLabelsColorPicker } from "./EventLabelsColorPicker";
import { EVENT_COLORS } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { eventColorLabelMapper } from "../utils";
import { AddEventFormValues } from "../schemas";
import { useAppDispatch } from "@/app/useAppDispatch";
import { addEvent, closeModal } from "../slices";

function AddEventForm() {
	const dispatch = useAppDispatch();
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<AddEventFormValues>({
		resolver: zodResolver(addEventValidationSchema, {}, { raw: true }),
		defaultValues: {
			title: "",
			description: "",
			start: "",
			end: "",
			labelColor: "",
		},
	});

	const handleSelectColor = (color: string) => {
		setValue("labelColor", color, { shouldValidate: true });
	};

	const onAddEventSubmit = (data: AddEventFormValues) => {
		// TODO in real app, it should be an API call async call
		const labelColor = eventColorLabelMapper[data.labelColor as keyof typeof eventColorLabelMapper];

		const eventData = {
			id: uuidv4(),
			title: data.title,
			description: data.description,
			start: normalizeDateTime(data.start),
			end: normalizeDateTime(data.end),
			label: labelColor,
		};
		dispatch(addEvent(eventData));
		dispatch(closeModal());
	};

	return (
		<form noValidate onSubmit={handleSubmit(onAddEventSubmit)}>
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
				<label className="block text-left text-[1.8rem] font-semibold leading-6 mb-4" htmlFor="labelColor">
					{t.form.eventForm.labelColor}
				</label>
				<Controller
					name="labelColor"
					control={control}
					render={({ field }) => (
						<EventLabelsColorPicker
							onSelect={handleSelectColor}
							selectedColor={field.value}
							eventColorLabels={EVENT_COLORS}
						/>
					)}
				/>
				{errors.labelColor && <p className="mt-2 text-xs text-red-500">{errors.labelColor.message}</p>}
			</div>

			<div className="mt-14 button-wrapper">
				<Button type="submit" variant="secondary" size="sm">
					{t.form.eventForm.createEvent}
				</Button>
			</div>
		</form>
	);
}
export { AddEventForm };
