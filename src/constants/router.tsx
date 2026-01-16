import { Icons } from '../components/common/base/Icon';

export const ROUTER_SIDEBAR = [
  {
    name: "Accounts",
    icon: <Icons.Person />,
    children: [
      { name: "Admin Management", href: "/admin" },
      { name: "Doula Management", href: "/admin/doulas" },
      { name: "Client Management", href: "/admin/clients" },
    ],
  },
  { name: "Article", href: "/admin/articles", icon: <Icons.ChatBubble /> },
  { name: "PD Session", href: "/admin/pd-sessions", icon: <Icons.CorporateFare /> },
  { name: "Category", href: "/admin/categories", icon: <Icons.Apps /> },
  { name: "Voucher", href: "/admin/voucher", icon: <Icons.ConfirmationNumber /> },
  { name: "Help Documents", href: "/admin/help-documents", icon: <Icons.Article /> },
  { name: "Search Settings", href: "/admin/search-settings", icon: <Icons.Settings /> },
];
