import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { useCurrentUser } from '@/hooks/use-current-user';
import { setServerValidationErrors } from '@/lib/utils';
import { profileDetailsSchema, type ProfileDetailsSchema } from '@/zod-schema/account/profile-details-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const ProfileDetailsForm = () => {
  const { name, email } = useCurrentUser()!;
  const form = useForm<ProfileDetailsSchema>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      name,
      email,
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
    (data: ProfileDetailsSchema) => {
      router.patch(AccountController.profileDetailsPatch(), data, {
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
        <Button type="submit" disabled={isFormDisabled} className="self-start">
          <LoadingSwap isLoading={isFormDisabled}>Save</LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  );
};
