import type { FlashMessage } from '@/types';
import { usePage } from '@inertiajs/react';

export const useFlashMessage = () => {
  const {
    props: { flashMessage },
  } = usePage<{ flashMessage: FlashMessage | null }>();
  return flashMessage;
};
