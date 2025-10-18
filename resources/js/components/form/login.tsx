import login from "@/routes/login";
import {
  loginSchema,
  type LoginSchema,
  type LoginServerValidationErrors,
} from "@/zod-schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

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
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  const onSubmit = useCallback(
    (data: LoginSchema) => {
      router.post(login.post().url, data, {
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
        },
        onSuccess() {
          toast.success("You are logged in.");
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
          setValue("password", "");
        },
      });
    },
    [setError, setValue],
  );
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <Input {...field} type="password" autoComplete="on" />
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
                    className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                    name={name}
                    onBlur={onBlur}
                    onCheckedChange={onChange}
                    ref={ref}
                    checked={value}
                    disabled={disabled}
                  />
                </FormControl>
                <FormLabel>Remember me?</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="orange"
          className="w-full"
          disabled={isFormDisabled}
        >
          {isFormDisabled ? "wait..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};
