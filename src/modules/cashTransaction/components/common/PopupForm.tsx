import * as Dialog from "@radix-ui/react-dialog";

interface PopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function PopupForm({ open, onOpenChange, children }: PopupProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />

        <Dialog.Content
          className="
            fixed z-50
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2

            w-[90vw]
            h-auto
            max-h-[94vh]
            max-w-[300]

            bg-white
            rounded-lg
            shadow-xl
            flex flex-col
            focus:outline-none
          "
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <Dialog.Title className="sr-only">
            Popup Form
          </Dialog.Title>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
