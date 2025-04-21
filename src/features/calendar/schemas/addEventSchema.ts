import { t } from "@/shared/locales";
import { z } from "zod";
import { baseEventSchema } from "./baseEventSchema";

const eventAddSchema = baseEventSchema.superRefine((data, ctx) => {
	const start = new Date(data.start);
	const end = new Date(data.end);
	const today = new Date();

	if (start < today) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t.form.validation.addEvent.startNotInPast,
			path: ["start"],
		});
	}

	if (end < today) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t.form.validation.addEvent.endNotInPast,
			path: ["end"],
		});
	}

	if (start >= end) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t.form.validation.addEvent.endTime,
			path: ["end"],
		});
	}
	if (!data.categoryLabelColor) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t.form.validation.addEvent.categoryLabelColor,
			path: ["categoryLabelColor"],
		});
	}
});

export { eventAddSchema };
