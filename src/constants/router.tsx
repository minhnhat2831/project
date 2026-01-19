import { icons } from '../components/common/base/Icon';

export const ROUTER_SIDEBAR = [
  {
    name: "Accounts",
    icon: <icons.Person />,
    children: [
      { name: "Admin Management", href: "/admin" },
      { name: "Doula Management", href: "/admin/doulas" },
      { name: "Client Management", href: "/admin/clients" },
    ],
  },
  { name: "Article", href: "/admin/articles", icon: <icons.ChatBubble /> },
  { name: "PD Session", href: "/admin/pd-sessions", icon: <icons.CorporateFare /> },
  { name: "Category", href: "/admin/categories", icon: <icons.Apps /> },
  { name: "Voucher", href: "/admin/voucher", icon: <icons.ConfirmationNumber /> },
  { name: "Help Documents", href: "/admin/help-documents", icon: <icons.Article /> },
  { name: "Search Settings", href: "/admin/search-settings", icon: <icons.Settings /> },
];
