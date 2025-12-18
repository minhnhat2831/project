import * as Dialog from "@radix-ui/react-dialog";

interface PopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function Popup({ open, onOpenChange, children }: PopupProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>

        <Dialog.Overlay className="fixed bg-black/40 z-40" />
        <Dialog.Content
          className="
            fixed z-50
            left-70 bottom-2
            -translate-x-1/2 -translate-y-1/2
            bg-white
            w-40 max-w-[90%]
            rounded shadow-xl p-4
          "
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
