import { Route, Routes } from "react-router"
import LoginPage from "../module/auth/pages/loginPage"

function App() {
  

  return (
    <>
      <Routes>
        <Route 
            path="/" 
            element={<LoginPage />}>
        </Route>
      </Routes>
    </>
  )
}

export default App
