import { Edit, Ellipsis } from "lucide-react";
import { DeleteBoardForm } from "../form/board/delete";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { BoardWithoutColor } from "./list";

export const BoardCard = ({ board }: { board: BoardWithoutColor }) => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-4">
        <CardTitle>
          <h2 className="font-bold text-xl">{board.title}</h2>
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <DeleteBoardForm slug={board.slug} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="italic text-gray-600">
        {board.description ?? "no description."}
      </CardContent>
    </Card>
  );
};
