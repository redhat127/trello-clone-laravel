import z from 'zod';

export const confirmPasswordSchema = z.object({
  password: z.string().min(1, 'password is required.').max(50, 'password is too long.'),
});

export type ConfirmPasswordSchema = z.infer<typeof confirmPasswordSchema>;
