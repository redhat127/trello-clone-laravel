import { router } from "@inertiajs/react";
import { type FormEvent, useCallback, useState } from "react";
import { toast } from "sonner";
import AccountController from "@/actions/App/Http/Controllers/AccountController";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
export const DeleteMyAccount = () => {
  const [isPending, setIsPending] = useState(false);
  const onSubmitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.delete(AccountController.delete.url(), {
      onBefore() {
        if (!confirm("Are you sure you want to delete your account?")) {
          return false;
        }
        setIsPending(true);
      },
      onFinish() {
        setIsPending(false);
      },
      onSuccess({ props }) {
        if (!props.flashMessage) {
          toast.success("Your account deleted");
        }
      },
    });
  }, []);
  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <Button type="submit" disabled={isPending} variant="destructive">
        <LoadingSwap isLoading={isPending}>Delete</LoadingSwap>
      </Button>
    </form>
  );
};
