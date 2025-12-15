import type React from "react";

interface Iprops {
    show : boolean,
    onClose? : React.MouseEventHandler<HTMLElement>,
    children : React.ReactNode;
}

export default function Popup({ show, onClose, children } : Iprops) {
  if (!show) return null;

  return (
    <div
      className="fixed bottom-15 left-50 bg-opacity-40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-40 max-w-[90%] rounded shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
