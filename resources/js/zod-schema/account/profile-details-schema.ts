import z from 'zod';

export const profileDetailsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'name is required.')
    .regex(/^[a-zA-Z0-9 _-]+$/, 'only english letters and numbers, space, underscore and hyphen are allowed.')
    .max(50, 'name is too long.'),
  email: z.email('valid email is required.').max(50, 'email is too long.'),
});

export type ProfileDetailsSchema = z.infer<typeof profileDetailsSchema>;
