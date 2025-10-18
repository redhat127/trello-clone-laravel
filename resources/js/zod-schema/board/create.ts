import z from "zod";

export const AVAILABLE_COLORS = [
  "bg-blue-600",
  "bg-red-600",
  "bg-orange-600",
  "bg-green-600",
] as const;

export const createBoardSchema = z.object({
  title: z
    .string()
    .trim()
    .min(6, "minimum for title is 6 characters.")
    .max(100, "title is too long."),
  description: z.string().trim().max(200, "description is too long."),
  color: z.literal(AVAILABLE_COLORS, { error: "color is wrong." }),
});

export type CreateBoardSchema = z.infer<typeof createBoardSchema>;

export type CreateBoardServerValidationErrors = Partial<
  Record<keyof CreateBoardSchema, string>
>;
