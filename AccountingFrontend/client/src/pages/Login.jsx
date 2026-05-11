import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

if (res.data.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
      // ✅ STORE TOKEN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful ✅");

      // Optional redirect
      window.location.href = "/dashboard";

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
};

export default Login; 