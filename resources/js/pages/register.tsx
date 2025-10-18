import { RegisterForm } from "@/components/form/register";
import { BaseLayout } from "@/components/layout/base";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import login from "@/routes/login";
import { Link } from "@inertiajs/react";
import type { ReactNode } from "react";

export default function Register() {
  return (
    <Card className="max-w-[380px] mx-auto mt-16">
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-2xl">Register</h1>
        </CardTitle>
        <CardDescription>Fill inputs below to register</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <div className="mt-4 flex items-center gap-1">
          <p className="text-gray-600">Already have an account?</p>
          <Link href={login.index()} className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

Register.layout = (page: ReactNode) => (
  <BaseLayout title="Register">{page}</BaseLayout>
);
