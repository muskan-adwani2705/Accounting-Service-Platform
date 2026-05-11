import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">

      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/">
          FinMatch AI
        </Link>

        <div className="d-flex align-items-center gap-2">

          <Link to="/" className="btn btn-outline-light">
            Home
          </Link>

          <Link to="/search" className="btn btn-outline-light">
            Search
          </Link>

          <Link to="/dashboard" className="btn btn-outline-light">
            Dashboard
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="btn btn-warning">
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline-light">
                Login
              </Link>

              <Link to="/register" className="btn btn-warning fw-bold">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="btn btn-danger"
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;