import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css"; // Global CSS
import Overview from "./pages/Overview";
import Tour from "./pages/Tour";
import LoginForm from "./pages/LoginForm";
import Account from "./pages/Account";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Overview />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="account" element={<Account />} />
      <Route path="tour/:slug" element={<Tour />} />
    </Routes>
  </BrowserRouter>
);
