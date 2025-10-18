import { BaseLayout } from "@/components/layout/base";
import type { Board } from "@/types";
import { usePage } from "@inertiajs/react";
import type { ReactNode } from "react";

export default function Home() {
  const {
    props: { boards },
  } = usePage<{ boards: { data: Board[] } }>();
  console.log(boards);
  return null;
}

Home.layout = (page: ReactNode) => (
  <BaseLayout absoluteTitle="Welcome to Trello Clone">{page}</BaseLayout>
);
