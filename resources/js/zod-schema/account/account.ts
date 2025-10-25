import z from "zod";

export const accountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required.")
    .max(50, "name is too long."),
  email: z.email("valid email is required.").max(50, "email is too long."),
});

export type AccountSchema = z.infer<typeof accountSchema>;
export type AccountServerValidationErrors = Partial<
  Record<keyof AccountSchema, string>
>;
