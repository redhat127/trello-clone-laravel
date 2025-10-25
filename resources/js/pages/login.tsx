import { Head } from "@inertiajs/react";
import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layout/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/form/login-form";
import { generateTitle } from "@/lib/utils";

export default function Login() {
  return (
    <>
      <Head>
        <title>{generateTitle("Login")}</title>
      </Head>
      <div className="p-4 px-8 mt-16">
        <Card className="max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>
              <h1 className="font-bold text-2xl">Login</h1>
            </CardTitle>
            <CardDescription>
              <p>Use your email and password to login</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Login.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
