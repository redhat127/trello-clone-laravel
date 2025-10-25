import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AccountController from "@/actions/App/Http/Controllers/AccountController";
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
import type { User } from "@/types";
import {
  type AccountSchema,
  type AccountServerValidationErrors,
  accountSchema,
} from "@/zod-schema/account/account";
export const AccountForm = () => {
  const {
    props: {
      auth: {
        data: { name, email },
      },
    },
  } = usePage<{ auth: { data: User } }>();
  const form = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name,
      email,
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
    (data: AccountSchema) => {
      router.post(AccountController.post.url(), data, {
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
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
        onSuccess({ props }) {
          if (!props.flashMessage) {
            toast.success("Account saved");
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
        <Button type="submit" disabled={isFormDisabled}>
          <LoadingSwap isLoading={isFormDisabled}>Save</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
};
