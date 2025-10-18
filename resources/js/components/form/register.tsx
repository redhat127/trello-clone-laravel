import register from "@/routes/register";
import {
  type RegisterSchema,
  registerSchema,
  type RegisterServerValidationErrors,
} from "@/zod-schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

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
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  const onSubmit = useCallback(
    (data: RegisterSchema) => {
      router.post(register.post().url, data, {
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
        },
        onSuccess() {
          toast.success("You are registered.");
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
                <Input {...field} type="password" autoComplete="on" />
              </FormControl>
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
          {isFormDisabled ? "wait..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};
