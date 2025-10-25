import { Head } from "@inertiajs/react";
import type { ReactNode } from "react";
import { BaseLayout } from "@/components/layout/base-layout";
import { generateTitle } from "@/lib/utils";

export default function Home() {
  return (
    <Head>
      <title>{generateTitle("Welcome to Trello Clone", true)}</title>
    </Head>
  );
}

Home.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
