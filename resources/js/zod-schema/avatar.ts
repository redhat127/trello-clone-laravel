import z from "zod";

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2mb

export const avatarSchema = z.object({
  avatar: z
    .instanceof(File, { error: "avatar is required." })
    .refine((file) => file.size > 0, {
      error: "file is empty.",
    })
    .refine((file) => file.size <= MAX_AVATAR_SIZE, {
      error: "avatar size must be less than 2mb.",
    })
    .refine((file) => ALLOWED_MIME_TYPES.includes(file.type), {
      error: "allowed types: jpeg, png, webp and gif",
    }),
});

export type AvatarSchema = z.infer<typeof avatarSchema>;

export type AvatarServerValidationErrors = Partial<
  Record<keyof AvatarSchema, string>
>;
