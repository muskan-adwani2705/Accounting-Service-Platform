import { useEffect, useState } from "react";
import API from "../api/api";

const Recommendations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await API.get("/recommendations");
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch recommendations");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>AI Recommendations</h2>

      {loading && <p>Loading...</p>}

      {!loading && data.length === 0 && <p>No suggestions found</p>}

      <div className="row">
        {data.map((acc) => (
          <div className="col-md-4" key={acc._id}>
            <div className="card shadow p-3 mb-3">
              <h5>{acc.user?.name}</h5>
              <p>{acc.location}</p>
              <p>{acc.specialization.join(", ")}</p>
              <p>{acc.experience} Years</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;