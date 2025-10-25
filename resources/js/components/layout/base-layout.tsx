import { Link, usePage } from "@inertiajs/react";
import { Trello } from "lucide-react";
import type { ReactNode } from "react";
import { home } from "@/routes";
import login from "@/routes/login";
import type { User } from "@/types";
import { Button } from "../ui/button";
import { Toaster } from "../ui/sonner";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  const {
    props: {
      auth: { data: auth },
    },
  } = usePage<{ auth: { data: User } }>();
  return (
    <>
      <header className="flex items-center justify-between px-8 p-4 bg-white border-b">
        <Link href={home()} className="flex items-center gap-1 text-orange-600">
          <Trello />
          <span className="font-bold text-2xl hidden sm:block">
            Trello Clone
          </span>
        </Link>
        {auth ? null : (
          <Button asChild>
            <Link href={login.index()}>Login</Link>
          </Button>
        )}
      </header>
      <main>
        {children}
        <Toaster />
      </main>
    </>
  );
};
