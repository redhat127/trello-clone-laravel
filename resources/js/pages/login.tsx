import { LoginForm } from "@/components/form/login";
import { BaseLayout } from "@/components/layout/base";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import register from "@/routes/register";
import { Link } from "@inertiajs/react";
import type { ReactNode } from "react";

export default function Login() {
  return (
    <Card className="max-w-[380px] mx-auto mt-16">
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-2xl">Login</h1>
        </CardTitle>
        <CardDescription>Use your email and password to login</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <div className="mt-4 flex items-center gap-1">
          <p className="text-gray-600">Don't have an account?</p>
          <Link
            href={register.index()}
            className="underline underline-offset-4"
          >
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

Login.layout = (page: ReactNode) => (
  <BaseLayout title="Login">{page}</BaseLayout>
);
