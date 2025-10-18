import { CreateBoard } from "@/components/board/create";
import { BoardList } from "@/components/board/list";
import { BaseLayout } from "@/components/layout/base";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Board } from "@/types";
import { usePage } from "@inertiajs/react";
import type { ReactNode } from "react";

export default function Home() {
  const {
    props: {
      boards: { data: boards },
    },
  } = usePage<{ boards: { data: Board[] } }>();
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="gap-0">
          <CardTitle>
            <h1 className="font-bold text-2xl">Your Boards</h1>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardContent>
          <CreateBoard />
        </CardContent>
      </Card>
      <BoardList boards={boards} />
    </div>
  );
}

Home.layout = (page: ReactNode) => (
  <BaseLayout absoluteTitle="Welcome to Trello Clone">{page}</BaseLayout>
);
