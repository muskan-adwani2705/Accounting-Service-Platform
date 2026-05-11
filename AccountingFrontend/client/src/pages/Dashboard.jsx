import { useEffect, useState } from "react";
import API from "../api/api";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [shortlist, setShortlist] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const shortlistRes = await API.get("/shortlist");
      const recRes = await API.get("/recommendations");

      setShortlist(shortlistRes.data);
      setRecommendations(recRes.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const chartData = {
    labels: ["Shortlisted", "Recommendations"],
    datasets: [
      {
        label: "Activity",
        data: [shortlist.length, recommendations.length],
      },
    ],
  };
  if (loading) return <p className="text-center mt-5">Loading Dashboard...</p>;

  return (

    <>
    <Navbar />
  <div className="container mt-5">
    {/* HERO HEADER */}
    <div
      className="p-5 rounded-4 shadow-lg mb-5 text-white"
      style={{
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #334155)"
      }}
    >
      <h1 className="display-5 fw-bold">
        Welcome Back 🚀
      </h1>
      <p className="lead mt-3">
        AI-powered financial expert dashboard
      </p>
    </div>
    {/* STATS CARDS */}
    <div className="row g-4 mb-5">
      <div className="col-md-4">
        <div className="card premium-card shadow-lg border-0 p-4 text-center h-100">
          <h1>⭐</h1>
          <h5 className="fw-bold mt-3">
            Shortlisted
          </h5>
          <h2 className="fw-bold">
            {shortlist.length}
          </h2>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card premium-card shadow-lg border-0 p-4 text-center h-100">
          <h1>🤖</h1>
          <h5 className="fw-bold mt-3">
            Recommendations
          </h5>
          <h2 className="fw-bold">
            {recommendations.length}
          </h2>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card premium-card shadow-lg border-0 p-4 text-center h-100">
          <h1>📈</h1>
          <h5 className="fw-bold mt-3">
            Total Activity
          </h5>
          <h2 className="fw-bold">
            {shortlist.length + recommendations.length}
          </h2>
        </div>
      </div>
    </div>
    {/* CHART */}
    <div className="card premium-card shadow-lg border-0 p-4 mb-5">
      <h4 className="fw-bold mb-4">
        Platform Analytics
      </h4>
      <Bar data={chartData} />
    </div>
    {/* SHORTLIST */}
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          ⭐ Saved Accountants
        </h3>
      </div>
      <div className="row">
        {shortlist.slice(0, 3).map((item) => (
          <div className="col-md-4" key={item._id}>
            <div className="card premium-card shadow-lg border-0 p-4 mb-4">
              <h5 className="fw-bold">
                {item.accountant?.user?.name || "Professional Accountant"}
              </h5>
              <p className="text-muted">
                📍 {item.accountant?.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* RECOMMENDATIONS */}
    <div>
      <h3 className="fw-bold mb-4">
        🤖 Recommended For You
      </h3>
      <div className="row">
        {recommendations.slice(0, 3).map((acc) => (
          <div className="col-md-4" key={acc._id}>
            <div className="card premium-card shadow-lg border-0 p-4 mb-4">
              <h5 className="fw-bold">
                {acc.user?.name || "Financial Expert"}
              </h5>
              <p className="text-muted">
                📍 {acc.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  </>
);
};

export default Dashboard;