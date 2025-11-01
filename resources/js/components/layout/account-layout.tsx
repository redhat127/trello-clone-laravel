import { cn, generateTitle } from '@/lib/utils';
import account from '@/routes/account';
import { Head, Link, usePage } from '@inertiajs/react';
import { ActivityIcon, User } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const AccountLayout = ({ children, title }: { children: ReactNode; title: string }) => {
  const { component } = usePage();
  return (
    <>
      <Head>
        <title>{generateTitle(`Account - ${title}`)}</title>
      </Head>
      <div className="space-y-4 p-4 px-8">
        <Card>
          <CardHeader className="gap-0">
            <CardTitle>
              <h1 className="text-2xl font-bold">Account</h1>
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row">
          <Card className="w-full p-4 sm:w-64">
            <CardContent className="p-0">
              <ul className="space-y-2">
                <li>
                  <Link
                    href={account.index()}
                    className={cn('flex items-center gap-1 rounded p-2 text-sm transition-colors hover:bg-orange-600 hover:text-white', {
                      'bg-orange-600 text-white': component === 'account/general',
                    })}
                  >
                    <User size={16} />
                    General
                  </Link>
                </li>
                <li>
                  <Link
                    href={account.index()}
                    className={cn('flex items-center gap-1 rounded p-2 text-sm transition-colors hover:bg-orange-600 hover:text-white', {
                      'bg-orange-600 text-white': component === 'account/session',
                    })}
                  >
                    <ActivityIcon size={16} />
                    Session
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
          <div className="w-full space-y-4">{children}</div>
        </div>
      </div>
    </>
  );
};
