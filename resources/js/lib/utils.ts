import { appName } from '@/env';
import type { ServerValidationErrors } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateTitle = (title: string) => {
  return `${appName} - ${title}`;
};

export const setServerValidationErrors = <TFieldValues extends FieldValues>(
  serverValidationErrors: ServerValidationErrors<TFieldValues>,
  setError: UseFormSetError<TFieldValues>,
) => {
  (Object.entries(serverValidationErrors) as Array<[keyof TFieldValues, string | undefined]>).forEach(([key, message]) => {
    if (message) {
      setError(key as Path<TFieldValues>, { message });
    }
  });
};
