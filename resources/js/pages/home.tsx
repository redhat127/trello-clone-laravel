import { BaseLayout } from '@/components/layout/base-layout';
import { generateTitle } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Home() {
  return (
    <Head>
      <title>{generateTitle('Your Projects, Perfectly Organized')}</title>
    </Head>
  );
}

Home.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
