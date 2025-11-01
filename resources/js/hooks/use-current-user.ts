import type { User } from '@/types';
import { usePage } from '@inertiajs/react';

export const useCurrentUser = () => {
  const {
    props: { auth },
  } = usePage<{ auth: { data: User } | null }>();
  return auth?.data;
};
