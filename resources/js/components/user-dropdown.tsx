import { Link } from "@inertiajs/react";
import { User } from "lucide-react";
import { useMemo, useState } from "react";
import { LogoutForm } from "@/form/logout-form";
import account from "@/routes/account";
import type { User as IUser } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const UserDropdown = ({ user: { name, email } }: { user: IUser }) => {
  const userInitials = useMemo(() => {
    return (
      <div className="flex items-center justify-center bg-red-600 text-white capitalize rounded-full w-8 h-8">
        {name[0]}
      </div>
    );
  }, [name]);
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>{userInitials}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            {userInitials}
            <div className="max-w-30">
              <p className="truncate">{name}</p>
              <p className="truncate font-normal text-sm text-gray-600">
                {email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Link
            href={account.index()}
            onClick={() => {
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full py-1.5 px-2"
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
