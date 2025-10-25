import type { ReactNode } from "react";
import { AccountLayout } from "@/components/layout/account-layout";
import { BaseLayout } from "@/components/layout/base-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountForm } from "@/form/account-form";

export default function Account() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-2xl">User Details</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AccountForm />
      </CardContent>
    </Card>
  );
}

Account.layout = (page: ReactNode) => (
  <BaseLayout>
    <AccountLayout title="Account">{page}</AccountLayout>
  </BaseLayout>
);
