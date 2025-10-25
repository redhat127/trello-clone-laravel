import { Head, Link, usePage } from "@inertiajs/react";
import { User } from "lucide-react";
import type { ReactNode } from "react";
import { cn, generateTitle } from "@/lib/utils";
import account from "@/routes/account";
import { Card, CardContent } from "../ui/card";

export const AccountLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const { component } = usePage();
  return (
    <>
      <Head>
        <title>{generateTitle(title)}</title>
      </Head>
      <div className="max-w-5xl mx-auto p-4 px-8 mt-16 flex flex-col md:flex-row gap-4 items-start">
        <Card className="py-4 w-full md:w-auto">
          <CardContent className="px-4">
            <ul className="bg-white w-full md:w-[200px] rounded space-y-1.5">
              <li>
                <Link
                  href={account.index()}
                  className={cn(
                    "hover:bg-orange-600 hover:text-white w-full p-2 rounded transition-colors flex items-center gap-2 text-sm",
                    {
                      "bg-orange-600 text-white":
                        component === "account/account",
                    },
                  )}
                >
                  <User size={18} />
                  General
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        {children}
      </div>
    </>
  );
};
