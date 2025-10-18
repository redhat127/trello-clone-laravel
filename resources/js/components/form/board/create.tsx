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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import board from "@/routes/board";
import {
  AVAILABLE_COLORS,
  createBoardSchema,
  type CreateBoardSchema,
  type CreateBoardServerValidationErrors,
} from "@/zod-schema/board/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const CreateBoardForm = () => {
  const form = useForm<CreateBoardSchema>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
      description: "",
      color: "bg-blue-600",
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
    (data: CreateBoardSchema) => {
      router.post(board.post().url, data, {
        preserveState: false,
        onBefore() {
          setIsPending(true);
        },
        onFinish() {
          setIsPending(false);
        },
        onSuccess() {
          toast.success("Board created.");
        },
        onError(errors: CreateBoardServerValidationErrors) {
          (
            Object.keys(errors) as Array<
              keyof CreateBoardServerValidationErrors
            >
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="on" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} autoComplete="on" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <div>Color</div>
              </FormLabel>
              <FormControl>
                <div className="flex gap-2 mt-2">
                  {AVAILABLE_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={cn(
                        "h-8 w-8 rounded-full border-2 duration-100 transition-all",
                        color,
                        field.value === color
                          ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                          : "opacity-70 hover:opacity-100",
                      )}
                      onClick={() => field.onChange(color)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isFormDisabled}>
          {isFormDisabled ? "wait..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};
