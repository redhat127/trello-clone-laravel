import { router } from "@inertiajs/react";
import { LogOutIcon } from "lucide-react";
import { type FormEvent, useCallback, useState } from "react";
import { toast } from "sonner";
import LogoutController from "@/actions/App/Http/Controllers/LogoutController";
export const LogoutForm = () => {
  const [isPending, setIsPending] = useState(false);
  const onSubmitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post(LogoutController.post.url(), undefined, {
      onBefore() {
        setIsPending(true);
      },
      onFinish() {
        setIsPending(false);
      },
      onSuccess({ props }) {
        if (!props.flashMessage) {
          toast.success("You are logged out");
        }
      },
    });
  }, []);
  return (
    <form onSubmit={onSubmitHandler} className="w-full">
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center gap-2 text-red-600 px-2 py-1.5"
      >
        <LogOutIcon className="text-inherit" />
        Logout
      </button>
    </form>
  );
};
