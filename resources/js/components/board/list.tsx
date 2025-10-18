import type { Board } from "@/types";
import { Card, CardContent } from "../ui/card";
import { BoardCard } from "./card";

export type BoardWithoutColor = Omit<Board, "color">;

export const BoardList = ({ boards }: { boards: BoardWithoutColor[] }) => {
  return boards.length > 0 ? (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  ) : (
    <Card>
      <CardContent>no board found.</CardContent>
    </Card>
  );
};
