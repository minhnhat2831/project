import { Route, Routes } from "react-router"
import LoginPage from "../module/auth/pages/loginPage"
import AdminLayout from "../layouts/adminLayout"

import { AdminPage } from "./LazyRouter"
import { Suspense } from "react"
import LoadingSpinner from "../component/common/loading"
function App() {

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}>
          </Route>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route index element={<AdminPage />}></Route>
            <Route path="/admin/admins" element={<AdminPage />}></Route>
          </Route>
          
        </Routes>
      </Suspense>
    </>
  )
}

export default App
