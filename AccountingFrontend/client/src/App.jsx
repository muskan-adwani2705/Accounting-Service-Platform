import {Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import AdminPanel from "./pages/AdminPanel";
import AccountantDetail from "./pages/AccountantDetail";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route
          path="/accountants/:id"
          element={<AccountantDetail />}
        />
      </Routes>
  );
}
export default App;