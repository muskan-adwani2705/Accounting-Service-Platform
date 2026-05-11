import { useEffect, useState } from "react";
import { getRecommendations } from "../api/api";

const Recommendations = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRecommendations();
      setList(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>🔥 Recommended For You</h3>

      {list.length === 0 && <p>No recommendations yet.</p>}

      {list.map((acc) => (
        <div key={acc._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{acc.user.name}</h4>
          <p>{acc.specialization.join(", ")}</p>
          <p>{acc.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;