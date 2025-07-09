import { BrowserRouter, Route, Routes } from "react-router";

import Overview from "./pages/Overview";
import Tour from "./pages/Tour";
import LoginForm from "./pages/LoginForm";
import Account from "./pages/Account";
import Header from "./components/overview/Header";
import Footer from "./components/overview/Footer";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<Overview />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="account" element={<Account />} />
          <Route path="tour/:slug" element={<Tour />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
