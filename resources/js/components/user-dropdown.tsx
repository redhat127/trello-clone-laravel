import account from '@/routes/account';
import type { User as IUser } from '@/types';
import { Link } from '@inertiajs/react';
import { User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { LogoutForm } from './form/logout-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const UserDropdown = ({ user: { name, email } }: { user: IUser }) => {
  const userInitials = useMemo(() => {
    return <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white capitalize">{name[0]}</div>;
  }, [name]);
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>{userInitials}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            {userInitials}
            <div className="flex max-w-30 flex-col">
              <span className="truncate">{name}</span>
              <span className="truncate text-sm font-normal text-gray-600">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Link href={account.index()} className="flex w-full items-center gap-2 px-2 py-1.5" onClick={() => setOpen(false)}>
            <User />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
