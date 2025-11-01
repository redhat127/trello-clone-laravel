import RegisterController from '@/actions/App/Http/Controllers/RegisterController';
import { setServerValidationErrors } from '@/lib/utils';
import { registerSchema, type RegisterSchema } from '@/zod-schema/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { LoadingSwap } from '../ui/loading-swap';
import { PasswordInput } from '../ui/password-input';

export const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
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
    (data: RegisterSchema) => {
      router.post(RegisterController.post(), data, {
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
    [setError],
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input {...field} aria-invalid={fieldState.invalid} id={field.name} autoComplete="on" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input {...field} type="email" aria-invalid={fieldState.invalid} id={field.name} autoComplete="on" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
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
          <LoadingSwap isLoading={isFormDisabled}>Register</LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  );
};
