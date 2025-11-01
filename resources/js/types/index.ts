import type { FieldValues } from 'react-hook-form';

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export type FlashMessage = {
  type: 'error' | 'success';
  text: string;
} | null;

export type ServerValidationErrors<TFieldValues extends FieldValues> = Partial<Record<keyof TFieldValues, string>>;
