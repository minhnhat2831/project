import { Route, Routes } from "react-router"
import LoginPage from "../modules/auth/pages/LoginPage"
import AdminLayout from "../layouts/AdminLayout"

import { AdminPage } from "./LazyRouter"
import { Suspense } from "react"
import LoadingSpinner from "../components/common/Loading"
import AuthContext from "../components/context/AuthContext"
import PublicRoute from "../components/context/PublicRoute"
import NotFoundPage from "../modules/error/pages/NotFoundPage"
function App() {

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }>
          </Route>


          <Route
            path="/admin"
            element={
              <AuthContext>
                <AdminLayout />
              </AuthContext>}
          >
            <Route index element={<AdminPage />}></Route>
            <Route path="/admin/admins" element={<AdminPage />}></Route>
          </Route>
          
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
