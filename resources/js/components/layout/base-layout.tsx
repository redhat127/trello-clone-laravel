import { Link, usePage } from "@inertiajs/react";
import { Trello } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { home } from "@/routes";
import login from "@/routes/login";
import type { FlashMessage, User } from "@/types";
import { Button } from "../ui/button";
import { Toaster } from "../ui/sonner";
import { UserDropdown } from "../user-dropdown";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  const {
    props: { auth, flashMessage },
  } = usePage<{ auth: { data: User } | null; flashMessage: FlashMessage }>();
  useEffect(() => {
    if (flashMessage) {
      toast[flashMessage.type](flashMessage.text);
    }
  }, [flashMessage]);
  return (
    <>
      <header className="flex items-center justify-between px-8 p-4 bg-white border-b">
        <Link href={home()} className="flex items-center gap-1 text-orange-600">
          <Trello />
          <span className="font-bold text-2xl hidden sm:block">
            Trello Clone
          </span>
        </Link>
        {auth ? (
          <UserDropdown user={auth.data} />
        ) : (
          <Button asChild>
            <Link href={login.index()}>Login</Link>
          </Button>
        )}
      </header>
      <main>
        {children}
        <Toaster position="top-center" />
      </main>
    </>
  );
};
