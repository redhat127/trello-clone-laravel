import { LoginForm } from '@/components/form/login-form';
import { BaseLayout } from '@/components/layout/base-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTitle } from '@/lib/utils';
import register from '@/routes/register';
import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Login() {
  return (
    <>
      <Head>
        <title>{generateTitle('Login')}</title>
      </Head>
      <div className="mx-auto mt-16 max-w-md p-4 px-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-bold">Login</h1>
            </CardTitle>
            <CardDescription>Use your email and password to login</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href={register.index()} className="text-base text-black underline underline-offset-4">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Login.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
