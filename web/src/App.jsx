import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";

import Overview from "./pages/Overview";
import Tour from "./pages/Tour";
import LoginForm from "./pages/LoginForm";
import Account from "./pages/Account";
import Header from "./components/overview/Header";
import Footer from "./components/overview/Footer";
import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./context/auth.context";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  console.log("protected routes", isAuthenticated);
  if (isAuthenticated) return <Outlet />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/tours" element={<Overview />} />
            <Route path="/account" element={<Account />} />
            <Route path="/tours/:slug" element={<Tour />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
}
