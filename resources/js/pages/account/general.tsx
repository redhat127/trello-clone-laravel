import { DeleteAccount } from '@/components/account/delete-account';
import { ProfileDetailsForm } from '@/components/form/account/profile-details-form';
import { AccountLayout } from '@/components/layout/account-layout';
import { BaseLayout } from '@/components/layout/base-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

export default function AccountGeneral() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold">Profile Details</h2>
          </CardTitle>
          <CardDescription>Update your basic profile information below</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileDetailsForm />
        </CardContent>
      </Card>
      <Card className="border-red-600">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold">Delete Account</h2>
          </CardTitle>
          <CardDescription className="text-red-600">
            Permanently delete your account and all associated data. This action cannot be undone, so please proceed with caution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccount />
        </CardContent>
      </Card>
    </>
  );
}

AccountGeneral.layout = (page: ReactNode) => (
  <BaseLayout>
    <AccountLayout title="General">{page}</AccountLayout>
  </BaseLayout>
);
