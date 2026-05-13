import { useContext, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./user/pages/Home";
import Contact from "./user/pages/Contact";
import Books from "./user/pages/Books";
import Profile from "./user/pages/Profile";
import View from "./user/pages/View";

import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminResources from "./admin/pages/AdminResources";
import AdminSettings from "./admin/pages/AdminSettings";

import Auth from "./Pages/Auth";
import Pnf from "./Pages/Pnf";
import Preloader from "./Components/Preloader";
import PaymentSuccess from "./user/pages/PaymentSuccess";
import PaymentFail from "./user/pages/PaymentFail";
import { routeContext } from "./contextAPI/RouteGuardContent";

function App() {
  const { role, setRole, authorisedUser, setAuthorisedUser } =
    useContext(routeContext);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 4000);
  return (
    <>
      <Routes>
        <Route path="/" element={isLoading ? <Preloader /> : <Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister />} />

        {role == "user" && (
          <>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentFail />} />
            <Route path="/books/:id" element={<View />} />
          </>
        )}

        {role == "admin" && (
          <>
            <Route
              path="/admin"
              element={isLoading ? <Preloader /> : <AdminDashboard />}
            />
            <Route path="/admin/resources" element={<AdminResources />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </>
        )}

        <Route path="/*" element={<Pnf />} />
      </Routes>
    </>
  );
}

export default App;
