import { setServerValidationErrors } from '@/lib/utils';
import { confirmPasswordSchema, type ConfirmPasswordSchema } from '@/zod-schema/confirm-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Method } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import { useCallback, useState, type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { LoadingSwap } from '../ui/loading-swap';
import { PasswordInput } from '../ui/password-input';

export const ConfirmPasswordForm = ({ dialogTrigger, url, method }: { dialogTrigger: ReactNode; url: string; method: Method }) => {
  const form = useForm<ConfirmPasswordSchema>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      password: '',
    },
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isPending || isSubmitting;
  const onSubmit = useCallback(
    (data: ConfirmPasswordSchema) => {
      router.visit(url, {
        method,
        data,
        preserveScroll: true,
        preserveState: 'errors',
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
        },
        onError(serverValidationErrors) {
          setServerValidationErrors(serverValidationErrors, setError);
        },
      });
    },
    [setError, url, method],
  );
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Confirm Password</DialogTitle>
          <DialogDescription>Enter your password to proceed</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <PasswordInput {...field} aria-invalid={fieldState.invalid} id={field.name} autoComplete="on" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                );
              }}
            />
            <Button type="submit" disabled={isFormDisabled}>
              <LoadingSwap isLoading={isFormDisabled}>Confirm</LoadingSwap>
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};
