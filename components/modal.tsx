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
      <Dialog.Content className="fixed inset-0 block overflow-auto bg-black/90 p-4 backdrop-blur-sm sm:p-8 md:p-16">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
