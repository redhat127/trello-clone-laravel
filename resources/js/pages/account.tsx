import { AccountForm } from "@/components/form/account";
import { AvatarForm } from "@/components/form/avatar";
import { BaseLayout } from "@/components/layout/base";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

export default function Account() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="gap-0">
          <CardTitle>
            <h1 className="font-bold text-2xl">Account</h1>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="max-w-lg">
        <CardContent>
          <AvatarForm />
        </CardContent>
      </Card>
      <Card className="max-w-lg">
        <CardContent>
          <AccountForm />
        </CardContent>
      </Card>
    </div>
  );
}

Account.layout = (page: ReactNode) => (
  <BaseLayout title="Account">{page}</BaseLayout>
);
