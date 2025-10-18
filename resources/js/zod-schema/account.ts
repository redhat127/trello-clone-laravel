import z from "zod";

export const accountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "minimum for name is 3 characters.")
    .max(50, "name is too long."),
});

export type AccountSchema = z.infer<typeof accountSchema>;

export type AccountServerValidationErrors = Partial<
  Record<keyof AccountSchema, string>
>;
