import account from "@/routes/account";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteAvatarForm = () => {
  const [isPending, setIsPending] = useState(false);
  return (
    <form
      className="absolute inset-0"
      onSubmit={(e) => {
        e.preventDefault();
        router.delete(account.avatarDelete().url, {
          preserveState: false,
          onBefore() {
            if (!confirm("Are you sure you want to delete your avatar?"))
              return false;
            setIsPending(true);
          },
          onFinish() {
            setIsPending(false);
          },
          onSuccess() {
            toast.success("Avatar deleted.");
          },
        });
      }}
    >
      <button
        type="submit"
        disabled={isPending}
        className="w-full h-full bg-red-600/80 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
      >
        <Trash size={20} />
      </button>
    </form>
  );
};
