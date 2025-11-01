import LoginController from '@/actions/App/Http/Controllers/LoginController';
import { setServerValidationErrors } from '@/lib/utils';
import { loginSchema, type LoginSchema } from '@/zod-schema/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { LoadingSwap } from '../ui/loading-swap';
import { PasswordInput } from '../ui/password-input';

export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
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
    (data: LoginSchema) => {
      router.post(LoginController.post(), data, {
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
        <Controller
          control={control}
          name="remember_me"
          render={({ field: { value, onChange, ...field }, fieldState }) => {
            return (
              <Field orientation="horizontal" data-invalid={fieldState.invalid} className="gap-2">
                <Checkbox {...field} aria-invalid={fieldState.invalid} id={field.name} checked={value} onCheckedChange={onChange} />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Remember me?</FieldLabel>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </FieldContent>
              </Field>
            );
          }}
        />
        <Button type="submit" disabled={isFormDisabled}>
          <LoadingSwap isLoading={isFormDisabled}>Login</LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  );
};
