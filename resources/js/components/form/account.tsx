import account from "@/routes/account";
import type { User } from "@/types";
import {
  accountSchema,
  type AccountSchema,
  type AccountServerValidationErrors,
} from "@/zod-schema/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
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

export const AccountForm = () => {
  const {
    props: {
      auth: {
        data: { name },
      },
    },
  } = usePage<{ auth: { data: User } }>();
  const form = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name,
    },
  });
  const {
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  const onSubmit = useCallback(
    (data: AccountSchema) => {
      router.post(account.post().url, data, {
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
        },
        onSuccess() {
          toast.success("Saved.");
        },
        onError(errors: AccountServerValidationErrors) {
          (
            Object.keys(errors) as Array<keyof AccountServerValidationErrors>
          ).forEach((key) => {
            const message = errors[key];
            if (message) {
              setError(key, { message });
            }
          });
        },
      });
    },
    [setError],
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
        <Button type="submit" variant="orange" disabled={isFormDisabled}>
          {isFormDisabled ? "wait..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};
