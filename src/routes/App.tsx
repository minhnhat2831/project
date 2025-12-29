import { Route, Routes } from "react-router"

import { Suspense } from "react"
import LoadingSpinner from "../components/common/Loading"
import AuthContext from "../components/context/AuthContext"
import PublicRoute from "../components/context/PublicRoute"
import NotFoundPage from "../modules/error/pages/NotFoundPage"

import { 
  AdminPage,
  LoginPage,
  AdminLayout,
  DoulaPage,
  ClientPage,
  PackagePage,
  DoulaViewPage,
  ClientViewPage
} from "./LazyRouter"

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
            <Route path="" element={<AdminPage />}></Route>
            <Route path="doulas" element={<DoulaPage />}></Route>
            <Route path="doulas/:id" element={<DoulaViewPage />}></Route>
            <Route path="clients" element={<ClientPage />}></Route>
            <Route path="package/:id" element={<PackagePage />}></Route>
            <Route path="clients/:id" element={<ClientViewPage />}></Route>
          </Route>
          
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
