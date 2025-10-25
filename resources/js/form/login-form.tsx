import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoginController from "@/actions/App/Http/Controllers/LoginController";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  type LoginSchema,
  type LoginServerValidationErrors,
  loginSchema,
} from "@/zod-schema/login-schema";
export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
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
    (data: LoginSchema) => {
      router.post(LoginController.post.url(), data, {
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
        },
        onError(errors: LoginServerValidationErrors) {
          (
            Object.keys(errors) as Array<keyof LoginServerValidationErrors>
          ).forEach((key) => {
            const message = errors[key];
            if (message) {
              setError(key, { message });
            }
          });
        },
        onSuccess({ props }) {
          if (!props.flashMessage) {
            toast.success("You are logged in");
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
        <FormField
          control={form.control}
          name="remember_me"
          render={({
            field: { name, onBlur, onChange, ref, value, disabled },
          }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    name={name}
                    onBlur={onBlur}
                    onCheckedChange={onChange}
                    ref={ref}
                    disabled={disabled}
                    checked={value}
                  />
                </FormControl>
                <FormLabel>Remember me?</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isFormDisabled} className="w-full">
          <LoadingSwap isLoading={isFormDisabled}>Login</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
};
