import type { ReactNode } from "react";
import { AccountLayout } from "@/components/layout/account-layout";
import { BaseLayout } from "@/components/layout/base-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountForm } from "@/form/account/account-form";
import { DeleteMyAccount } from "@/form/account/delete-my-account";

export default function Account() {
  return (
    <div className="space-y-4 w-full">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="font-bold text-xl">User Details</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AccountForm />
        </CardContent>
      </Card>
      <Card className="border-red-600">
        <CardHeader>
          <CardTitle>
            <h2 className="font-bold text-xl">Danger Zone</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-red-600">
            Deleting your account is{" "}
            <strong className="font-semibold">
              <u className="underline underline-offset-4">permanent</u>
            </strong>{" "}
            and cannot be undone. All your data will be lost. Please proceed
            with caution.
          </p>
          <DeleteMyAccount />
        </CardContent>
      </Card>
    </div>
  );
}

Account.layout = (page: ReactNode) => (
  <BaseLayout>
    <AccountLayout title="Account">{page}</AccountLayout>
  </BaseLayout>
);
