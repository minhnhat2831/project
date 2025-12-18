import { lazy } from "react";

export const LoginPage = lazy(() => import("../modules/auth/pages/LoginPage"))
export const AdminLayout = lazy(() => import("../layouts/AdminLayout"))
export const AdminPage = lazy(() => import("../modules/admin/pages/AdminPage"))
export const DoulaPage = lazy(() => import("../modules/doula/pages/DoulaPage"))
export const ClientPage = lazy(() => import("../modules/client/pages/ClientPage"))
