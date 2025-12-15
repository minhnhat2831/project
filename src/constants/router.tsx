import { BookText, Building2, LayoutDashboard, MessageSquare, Settings, TicketPercent, User } from "lucide-react";

export const ROUTER_SIDEBAR = [
    { name: "Account",href : "", icon: <User /> },
    { name: "Admin Management", href: "/admin/admins" },
    { name: "Doula Management", href: "/admin/doulas" },
    { name: "Client Management", href: "/admin/client" },
    { name: "Article", href: "/admin/articles", icon: <MessageSquare /> },
    { name: "PD Session", href: "/admin/pd-sessions", icon: <Building2 /> },
    { name: "Category", href: "/admin/categories", icon: <LayoutDashboard /> },
    { name: "Voucher", href: "/admin/voucher", icon: <TicketPercent /> },
    { name: "Help Documents", href: "/admin/help-documents", icon: <BookText /> },
    { name: "Search Settings", href: "/admin/search-settings", icon: <Settings /> },
]
