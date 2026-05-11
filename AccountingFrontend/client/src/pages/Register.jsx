import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    location: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();  // STEP 1: stop page refresh

  // STEP 2: validation
  if (!form.name || !form.email || !form.password || !form.role) {
    alert("All fields are required");
    return;
  }

  try {
    // ✅ STEP 3: API CALL 
    const res = await API.post("/auth/register", form);

localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

if (res.data.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
    console.log(res.data);

  } catch (err) {
    // STEP 5: error handling
    alert(err.response?.data?.message || "Registration failed ❌");
  }
};

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-3">Create Account 🚀</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          {/* Email */}
          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          {/* Password */}
          <input
            className="form-control mb-2"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          {/* Role */}
          <select
            className="form-select mb-3"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="sme">SME (Business Owner)</option>
            <option value="accountant">Accountant</option>
            <option value="admin">Admin</option>
          </select>

          {/* Location only for accountant */}
          {form.role === "accountant" && (
            <input
              className="form-control mb-3"
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />
          )}

          {/* Submit */}
          <button className="btn btn-warning w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;