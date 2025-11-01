import type { User as IUser } from '@/types';
import { User } from 'lucide-react';
import { useMemo } from 'react';
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
  return (
    <DropdownMenu>
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
        <DropdownMenuItem>
          <User />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
