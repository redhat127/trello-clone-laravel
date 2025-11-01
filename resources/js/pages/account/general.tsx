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
    </>
  );
}

AccountGeneral.layout = (page: ReactNode) => (
  <BaseLayout>
    <AccountLayout title="General">{page}</AccountLayout>
  </BaseLayout>
);
