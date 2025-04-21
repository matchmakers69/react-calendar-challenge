import { t } from "@/shared/locales";
import { z } from "zod";

const baseEventSchema = z.object({
	title: z
		.string()
		.min(2, { message: t.form.validation.addEvent.titleMin })
		.max(30, { message: t.form.validation.addEvent.titleMaxLength }),
	description: z
		.string()
		.optional()
		.refine((val) => !val || val.length >= 10, { message: t.form.validation.addEvent.descriptionMin })
		.refine((val) => !val || val.length <= 500, { message: t.form.validation.addEvent.descriptionMaxLength }),
	start: z.string().min(1, { message: t.form.validation.addEvent.start }),
	end: z.string().min(1, { message: t.form.validation.addEvent.end }),
	categoryLabelColor: z.string().min(1, { message: t.form.validation.addEvent.categoryLabelColor }),
});
export { baseEventSchema };
export type EventFormValues = z.infer<typeof baseEventSchema>;
