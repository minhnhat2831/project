import { Route, Routes } from "react-router"

import { Suspense } from "react"
import LoadingSpinner from "../components/common/base/Loading"
import AuthContext from "../components/context/AuthContext"
import PublicRoute from "../components/context/PublicRoute"

import { 
  AdminPage,
  LoginPage,
  Layout,
  DoulaPage,
  ClientPage,
  PackagePage,
  DoulaViewPage,
  ClientViewPage,
  ArticlePage,
  PdSessionPage,
  CategoryPage,
  VoucherPage,
  VoucherViewPage,
  HelpDocumentPage,
  SearchSettingPage,
  NotFoundPage
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
                <Layout />
              </AuthContext>}
          >
            <Route index element={<AdminPage />}></Route>
            <Route path="" element={<AdminPage />}></Route>

            <Route path="doulas" element={<DoulaPage />}></Route>
            <Route path="doulas/:id" element={<DoulaViewPage />}></Route>

            <Route path="clients" element={<ClientPage />}></Route>
            <Route path="clients/:id" element={<ClientViewPage />}></Route>
            <Route path="package/:id" element={<PackagePage />}></Route>

            <Route path="articles" element={<ArticlePage />}></Route>

            <Route path="pd-sessions" element={<PdSessionPage />}></Route>

            <Route path="categories" element={<CategoryPage />}></Route>

            <Route path="voucher" element={<VoucherPage />}></Route>
            <Route path="voucher/:id" element={<VoucherViewPage />}></Route>

            <Route path="help-documents" element={<HelpDocumentPage />}></Route>
            
            <Route path="search-settings" element={<SearchSettingPage />}></Route>
          </Route>
          
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
