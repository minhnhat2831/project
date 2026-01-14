import * as Dialog from "@radix-ui/react-dialog";

interface PopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function PopupConfirm({open, onOpenChange, children} : PopupProps){
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
            <Dialog.Content
              className="fixed rounded-xl lg:top-1/3 lg:right-1/3 top-50 right-50 z-50 sm:top-50 sm:right-30 h-50 w-100 bg-white shadow-xl focus:outline-none"
              onInteractOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
            >
              <Dialog.Title></Dialog.Title>
              {children}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      );
}