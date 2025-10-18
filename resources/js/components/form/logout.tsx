import logout from "@/routes/logout";
import { router } from "@inertiajs/react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export const LogoutForm = () => {
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        router.post(logout.post().url, undefined, {
          onSuccess() {
            toast.success("You are logged out.");
          },
        });
      }}
    >
      <button
        type="submit"
        className="py-1.5 px-2 w-full flex items-center gap-2 text-red-600"
      >
        <LogOut className="text-inherit" />
        Logout
      </button>
    </form>
  );
};
