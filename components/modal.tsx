import * as Dialog from '@radix-ui/react-dialog';
import type { FC, ReactNode } from 'react';

const Modal: FC<{
  trigger: ReactNode;
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ trigger, children, open, setOpen }) => (
  <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Content className="fixed inset-0 block bg-black/90 p-16 backdrop-blur-sm">
        <div className="rounded-sm bg-white p-4">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
