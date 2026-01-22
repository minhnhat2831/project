import * as Dialog from "@radix-ui/react-dialog";

interface PopupProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export default function PopupCreate({ open, onOpenChange, children }: PopupProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed bg-black/40 z-40" />
                <Dialog.Content
                    className="
            fixed z-50
            -right-14 top-25
            -translate-x-1/2 -translate-y-1/2
            bg-white
            w-40 max-w-[90%]
            h-26
            rounded shadow-xl p-4
          "
                >
                    <Dialog.Title></Dialog.Title>
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
