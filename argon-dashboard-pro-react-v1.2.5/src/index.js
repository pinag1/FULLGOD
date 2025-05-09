/*!

=========================================================
* Argon Dashboard PRO React - v1.2.5
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import ReactDOM from "react-dom/client";
// react library for routing
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// plugins styles from node_modules
import "@fortawesome/fontawesome-free/css/all.min.css";
import "quill/dist/quill.core.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
// plugins styles downloaded
import "assets/vendor/nucleo/css/nucleo.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.2.1";
import { AuthProvider } from "./context/AuthContext"; // Certifique-se de importar o AuthProvider

import PrivateRoute from "components/PrivateRoute";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import IndexView from "views/Index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider> {/* Aqui você envolve toda a aplicação com o AuthProvider */}
      <Routes>
      <Route path="/admin/*" element={
  <PrivateRoute>
    <AdminLayout />
  </PrivateRoute>
} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/" element={<IndexView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
