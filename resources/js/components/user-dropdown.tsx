import account from "@/routes/account";
import type { User as IUser } from "@/types";
import { Link } from "@inertiajs/react";
import { User } from "lucide-react";
import { useMemo, useState } from "react";
import { LogoutForm } from "./form/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const UserDropDown = ({ user }: { user: IUser }) => {
  const { name, email } = user;
  const userInitials = useMemo(() => {
    return (
      <div className="bg-sky-700 flex items-center justify-center text-white rounded-full h-8 w-8 capitalize">
        {name[0]}
      </div>
    );
  }, [name]);
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>{userInitials}</DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            {userInitials}
            <div className="max-w-38">
              <div className="truncate">{name}</div>
              <div className="truncate text-sm font-normal text-gray-600">
                {email}
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Link
            href={account.index().url}
            className="py-1.5 px-2 w-full flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
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
