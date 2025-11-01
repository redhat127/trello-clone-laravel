import LogoutController from '@/actions/App/Http/Controllers/LogoutController';
import { router } from '@inertiajs/react';
import { LogOutIcon } from 'lucide-react';
import { useCallback, useState, type FormEvent } from 'react';

export const LogoutForm = () => {
  const [isPending, setIsPending] = useState(false);
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post(LogoutController.post(), undefined, {
      onBefore() {
        setIsPending(true);
      },
      onFinish() {
        setIsPending(false);
      },
    });
  }, []);
  return (
    <form onSubmit={onSubmit} className="w-full">
      <button type="submit" disabled={isPending} className="flex w-full items-center gap-2 px-2 py-1.5 text-red-600">
        <LogOutIcon className="text-inherit" />
        Logout
      </button>
    </form>
  );
};
