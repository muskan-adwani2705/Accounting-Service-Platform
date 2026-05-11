import { useEffect, useState } from "react";
import API from "../api/api";

const AdminPanel = () => {
  const [accountants, setAccountants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnverified();
  }, []);

  const fetchUnverified = async () => {
    try {
      const res = await API.get("/accountants/admin/unverified");
      setAccountants(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
    setLoading(false);
  };

  const handleVerify = async (id) => {
    try {
      await API.put(`/accountants/admin/verify/${id}`);
      alert("Accountant verified!");

      // remove from UI instantly
      setAccountants((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert("Verification failed");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4 fw-bold">
        🛠️ Admin Panel
      </h1>

      {accountants.length === 0 && (
        <p className="text-center text-muted">
          No unverified accountants
        </p>
      )}

      <div className="row">
        {accountants.map((acc) => (
          <div className="col-md-4" key={acc._id}>

            <div className="card premium-card p-3 mb-4">

              <h5>{acc.user?.name}</h5>
              <p className="text-muted small">{acc.user?.email}</p>

              <p>
                <b>Location:</b> {acc.location} <br />
                <b>Experience:</b> {acc.experience} yrs
              </p>

              <button
                className="btn btn-success w-100"
                onClick={() => handleVerify(acc._id)}
              >
                ✅ Verify
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminPanel;