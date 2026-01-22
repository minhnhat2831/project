import { Search } from "@/components/common/base/Search";
import { type ReactNode } from "react";

interface prop {
  href?: string;
  childrenHref?: string | null;
  children?: ReactNode | null;
  hidden?: string;
}

export default function Header({ href, childrenHref, children, hidden }: prop) {
  return (
    <div className="fixed top-0 left-60 right-0 h-15 flex justify-between items-center z-50 bg-white">
      <div className="flex items-center gap-8 p-5">
        <a href={href}>{childrenHref}</a>
        <Search hidden={hidden} />
      </div>
      {children}
    </div>
  );
}