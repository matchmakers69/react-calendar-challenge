import { t } from "@/shared/locales";
import { today } from "@/utils";
import { z } from "zod";

export const addEventValidationSchema = z
	.object({
		title: z
			.string()
			.min(2, { message: t.form.validation.addEvent.titleMin })
			.max(30, { message: t.form.validation.addEvent.titleMaxLength })
			.max(30, { message: t.form.validation.addEvent.titleMaxLength }),

		description: z
			.string()
			.min(10, { message: t.form.validation.addEvent.descriptionMin })
			.max(500, { message: t.form.validation.addEvent.descriptionMaxLength }),

		start: z
			.string()
			.min(1, { message: t.form.validation.addEvent.start })
			.refine(
				(value) => {
					const start = new Date(value);
					return start >= today;
				},
				{ message: t.form.validation.addEvent.startNotInPast },
			),

		end: z.string().min(1, { message: t.form.validation.addEvent.end }),
		labelColor: z.string().min(1, { message: t.form.validation.addEvent.labelColor }),
	})
	.refine(
		(data) => {
			const start = new Date(data.start);
			const end = new Date(data.end);
			return start < end;
		},
		{
			message: t.form.validation.addEvent.endTime,
			path: ["end"],
		},
	);

export type AddEventFormValues = z.infer<typeof addEventValidationSchema>;
