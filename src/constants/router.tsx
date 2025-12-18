import { Icons } from '../components/common/Icon';

export const ROUTER_SIDEBAR = [
  { name: "Account", href: "/admin", icon: <Icons.Person /> },
  { name: "Admin Management", href: "/admin" },
  { name: "Doula Management", href: "/admin/doulas" },
  { name: "Client Management", href: "/admin/clients" },
  { name: "Article", href: "/admin/articles", icon: <Icons.ChatBubble /> },
  { name: "PD Session", href: "/admin/pd-sessions", icon: <Icons.CorporateFare /> },
  { name: "Category", href: "/admin/categories", icon: <Icons.Apps /> },
  { name: "Voucher", href: "/admin/voucher", icon: <Icons.ConfirmationNumber /> },
  { name: "Help Documents", href: "/admin/help-documents", icon: <Icons.Article /> },
  { name: "Search Settings", href: "/admin/search-settings", icon: <Icons.Settings /> },
];
