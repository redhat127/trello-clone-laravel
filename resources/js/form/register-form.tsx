import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import RegisterController from "@/actions/App/Http/Controllers/RegisterController";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";
import {
  type RegisterSchema,
  type RegisterServerValidationErrors,
  registerSchema,
} from "@/zod-schema/register-schema";
export const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  const onSubmitHandler = useCallback(
    (data: RegisterSchema) => {
      router.post(RegisterController.post.url(), data, {
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
        },
        onError(errors: RegisterServerValidationErrors) {
          (
            Object.keys(errors) as Array<keyof RegisterServerValidationErrors>
          ).forEach((key) => {
            const message = errors[key];
            if (message) {
              setError(key, { message });
            }
          });
        },
        onSuccess({ props }) {
          if (!props.flashMessage) {
            toast.success("You are registered");
          }
        },
      });
    },
    [setError],
  );
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="on" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" autoComplete="on" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} autoComplete="on" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isFormDisabled} className="w-full">
          <LoadingSwap isLoading={isFormDisabled}>Register</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
};
