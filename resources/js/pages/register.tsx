import { RegisterForm } from '@/components/form/register-form';
import { BaseLayout } from '@/components/layout/base-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTitle } from '@/lib/utils';
import login from '@/routes/login';
import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Register() {
  return (
    <>
      <Head>
        <title>{generateTitle('Register')}</title>
      </Head>
      <div className="mx-auto mt-16 max-w-md p-4 px-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-bold">Register</h1>
            </CardTitle>
            <CardDescription>Fill inputs below to register</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <Link href={login.index()} className="text-base text-black underline underline-offset-4">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Register.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
