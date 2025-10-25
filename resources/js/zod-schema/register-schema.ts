import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required.")
    .max(50, "name is too long."),
  email: z.email("valid email is required.").max(50, "email is too long."),
  password: z
    .string()
    .min(10, "minimum for password is 10 characters.")
    .max(50, "password is too long."),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterServerValidationErrors = Partial<
  Record<keyof RegisterSchema, string>
>;
