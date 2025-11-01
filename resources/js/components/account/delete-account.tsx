import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { ConfirmPasswordForm } from '../form/confirm-password-form';
import { Button } from '../ui/button';

export const DeleteAccount = () => {
  return (
    <ConfirmPasswordForm
      url={AccountController.delete.url()}
      method="delete"
      dialogTrigger={
        <Button type="button" variant="destructive">
          Delete
        </Button>
      }
    />
  );
};
