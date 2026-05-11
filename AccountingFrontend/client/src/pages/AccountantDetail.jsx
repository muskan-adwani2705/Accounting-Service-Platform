import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccountantById } from "../api/api";

const AccountantDetail = () => {
  const { id } = useParams();
  const [accountant, setAccountant] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccountant = async () => {
      try {
        const res = await API.get(`/accountants/${id}`);
        setAccountant(res.data);
      } catch (err) {
        setError("Failed to load accountant details");
      }
    };
    fetchAccountant();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!accountant) return <p>Loading...</p>;

  return (
    <div>
      <h2>{accountant.user.name}</h2>
      <p><b>Email:</b> {accountant.user.email}</p>
      <p><b>Services:</b> {accountant.specialization.join(", ")}</p>
      <p><b>Experience:</b> {accountant.experience} years</p>
      <p><b>Location:</b> {accountant.location}</p>
      <p><b>Description:</b> {accountant.description}</p>
    </div>
  );
};

export default AccountantDetail;
