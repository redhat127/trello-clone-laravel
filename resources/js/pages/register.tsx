import { Head, Link } from "@inertiajs/react";
import type { ReactNode } from "react";

import { BaseLayout } from "@/components/layout/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/form/register-form";
import { generateTitle } from "@/lib/utils";
import login from "@/routes/login";

export default function Register() {
  return (
    <>
      <Head>
        <title>{generateTitle("Register")}</title>
      </Head>
      <div className="p-4 px-8 mt-16">
        <Card className="max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>
              <h1 className="font-bold text-2xl">Register</h1>
            </CardTitle>
            <CardDescription>
              <p>Fill inputs below to register</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <p className="text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                href={login.index()}
                className="underline underline-offset-4 text-black"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Register.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
