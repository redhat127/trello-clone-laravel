import { useCurrentUser } from '@/hooks/use-current-user';
import { useFlashMessage } from '@/hooks/use-flash-message';
import { home } from '@/routes';
import login from '@/routes/login';
import { Link } from '@inertiajs/react';
import { Trello } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Toaster } from '../ui/sonner';
import { UserDropdown } from '../user-dropdown';

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  const user = useCurrentUser();
  const flashMessage = useFlashMessage();
  useEffect(() => {
    if (flashMessage) {
      toast[flashMessage.type](flashMessage.text);
    }
  }, [flashMessage]);
  return (
    <>
      <header className="flex items-center justify-between border-b bg-white p-4 px-8">
        <Link href={home()} className="flex items-center gap-1 text-orange-600">
          <Trello />
          <span className="hidden text-2xl font-bold sm:block">Trello Clone</span>
        </Link>
        {user ? (
          <UserDropdown user={user} />
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
