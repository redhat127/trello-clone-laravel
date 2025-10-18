import account from "@/routes/account";
import type { User } from "@/types";
import {
  ALLOWED_MIME_TYPES,
  type AvatarSchema,
  avatarSchema,
  type AvatarServerValidationErrors,
} from "@/zod-schema/avatar";
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

export const AvatarForm = () => {
  const {
    props: {
      auth: {
        data: { avatar, name },
      },
    },
  } = usePage<{ auth: { data: User } }>();
  const form = useForm<AvatarSchema>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: undefined,
    },
    mode: "onChange",
  });
  const {
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  const onSubmit = useCallback(
    (data: AvatarSchema) => {
      router.post(account.avatarPost().url, data, {
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
        },
        onSuccess() {
          toast.success("Avatar saved.");
        },
        onError(errors: AvatarServerValidationErrors) {
          (
            Object.keys(errors) as Array<keyof AvatarServerValidationErrors>
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
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined,
  );
  return (
    <div className="space-y-4">
      <div className="rounded-full w-16 h-16 overflow-hidden">
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="avatar preview"
            className="w-full h-full object-cover"
          />
        ) : avatar ? (
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-sky-700 text-white capitalize text-xl flex items-center justify-center w-full h-full">
            {name[0]}
          </div>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { name, onBlur, onChange, ref, disabled } }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept={ALLOWED_MIME_TYPES.join(", ")}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => {
                      const avatar = e.target.files?.[0];
                      onChange(avatar);
                      const validation = avatarSchema.safeParse({ avatar });
                      if (validation.success) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setAvatarPreview(e.target?.result?.toString());
                        };
                        reader.readAsDataURL(validation.data.avatar);
                      } else {
                        setAvatarPreview(undefined);
                      }
                    }}
                    ref={ref}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="orange" disabled={isFormDisabled}>
            {isFormDisabled ? "wait..." : "Upload"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
