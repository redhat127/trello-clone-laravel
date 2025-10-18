import { home } from "@/routes";
import login from "@/routes/login";
import type { User } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { Trello } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { Toaster } from "../ui/sonner";
import { UserDropDown } from "../user-dropdown";

type Props = (
  | { title: string; absoluteTitle?: never }
  | { title?: never; absoluteTitle: string }
) & { children: ReactNode };

const appName = import.meta.env.VITE_APP_NAME;

export const BaseLayout = ({ title, absoluteTitle, children }: Props) => {
  const {
    props: { auth },
  } = usePage<{ auth: { data: User } }>();
  return (
    <>
      <Head>
        <title>{absoluteTitle || `${appName} - ${title}`}</title>
      </Head>
      <header className="bg-white flex items-center justify-between p-4 px-8">
        <Link href={home()} className="flex items-center gap-1 text-orange-600">
          <Trello />
          <span className="font-bold text-2xl hidden sm:block">
            Trello Clone
          </span>
        </Link>
        {!auth ? (
          <Button asChild variant="orange">
            <Link href={login.index()}>Login</Link>
          </Button>
        ) : (
          <UserDropDown user={auth.data} />
        )}
      </header>
      <main className="p-4">
        {children}
        <Toaster />
      </main>
    </>
  );
};
