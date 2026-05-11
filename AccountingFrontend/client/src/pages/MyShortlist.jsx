import { useEffect, useState } from "react";
import { getShortlist, removeFromShortlist } from "../api/api";

const MyShortlist = () => {
  const [list, setList] = useState([]);

  const fetchShortlist = async () => {
    const res = await getShortlist();
    setList(res.data);
  };

  useEffect(() => {
    fetchShortlist();
  }, []);

  const handleRemove = async (id) => {
    await removeFromShortlist(id);
    fetchShortlist();
  };

  return (
    <div>
      <h2>My Shortlisted Accountants</h2>

      {list.length === 0 && <p>No shortlisted accountants.</p>}

      {list.map((item) => (
        <div key={item._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <h4>{item.accountant.user.name}</h4>
          <p>Email: {item.accountant.user.email}</p>
          <p>Location: {item.accountant.location}</p>

          <button onClick={() => handleRemove(item.accountant._id)}>
            ❌ Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyShortlist;