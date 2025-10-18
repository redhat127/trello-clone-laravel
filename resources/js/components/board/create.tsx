import { CreateBoardForm } from "../form/board/create";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const CreateBoard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Create a new Board</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Create Board</DialogTitle>
          <DialogDescription>
            Use inputs below to create a board
          </DialogDescription>
        </DialogHeader>
        <CreateBoardForm />
      </DialogContent>
    </Dialog>
  );
};
