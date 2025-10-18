import board from "@/routes/board";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export const DeleteBoardForm = ({ slug }: { slug: string }) => {
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        router.delete(board.delete(slug).url, {
          preserveState: false,
          onBefore() {
            return confirm("Are you sure you want to delete this board?");
          },
          onSuccess() {
            toast.success("Board deleted.");
          },
        });
      }}
    >
      <button
        type="submit"
        className="text-red-600 focus:text-red-600 flex items-center gap-2 py-1.5 px-2 w-full"
      >
        <Trash className="text-inherit" />
        Delete
      </button>
    </form>
  );
};
