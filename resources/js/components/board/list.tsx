import type { Board } from "@/types";
import { Card, CardContent } from "../ui/card";

type BoardWithoutColor = Omit<Board, "color">;

export const BoardList = ({ boards }: { boards: BoardWithoutColor[] }) => {
  return boards.length > 0 ? (
    boards.map((board) => <BoardCard key={board.id} board={board} />)
  ) : (
    <Card>
      <CardContent>no board found.</CardContent>
    </Card>
  );
};

const BoardCard = ({ board }: { board: BoardWithoutColor }) => {
  console.log(board);
  return null;
};
