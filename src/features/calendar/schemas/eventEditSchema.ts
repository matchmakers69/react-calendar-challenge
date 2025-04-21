import { t } from "@/shared/locales";
import { z } from "zod";
import { baseEventSchema } from "./baseEventSchema";

const eventEditSchema = baseEventSchema.superRefine((data, ctx) => {
	const start = new Date(data.start);
	const end = new Date(data.end);

	if (start >= end) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: t.form.validation.addEvent.endTime,
			path: ["end"],
		});
	}
});

export { eventEditSchema };
export type EventEditFormValues = z.infer<typeof eventEditSchema>;
