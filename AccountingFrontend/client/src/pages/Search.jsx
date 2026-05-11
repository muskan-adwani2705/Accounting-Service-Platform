import { useState } from "react";
import API, { addToShortlist } from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Search = () => {

  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [minExperience, setMinExperience] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.get("/accountants/search", {
        params: {
          service,
          location,
          minExperience
        }
      });

      console.log(res.data);

      setResults(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed to fetch accountants");

    }

    setLoading(false);
  };

  const handleSave = async (id) => {

    try {

      await addToShortlist(id);

      alert("Saved to shortlist!");

    } catch {

      alert("Already saved");

    }
  };

  return (
    <>

      <Navbar />

    <div className="container mt-5">

      {/* HEADER */}

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Find the Right Accountant
        </h1>

        <p className="text-muted">
          Smart recommendations powered by AI
        </p>

      </div>

      {/* SEARCH FORM */}

      <form
        className="row g-3 mb-5 justify-content-center"
        onSubmit={handleSearch}
      >

        <div className="col-md-3">

          <input
            className="form-control form-control-lg"
            placeholder="Service (GST, Tax, Audit)"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />

        </div>

        <div className="col-md-3">

          <input
            className="form-control form-control-lg"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

        </div>

        <div className="col-md-2">

          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="Min Exp"
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
          />

        </div>

        <div className="col-md-2">

          <button className="btn btn-dark btn-lg w-100">
            Search
          </button>

        </div>

      </form>

      {loading && (
        <p className="text-center">
          Loading...
        </p>
      )}

      {/* RESULTS */}

      <div className="row">

        {results.length === 0 && !loading && (

          <p className="text-center text-muted">
            No results found
          </p>

        )}

        {results.map((acc, index) => (

          <div
            className="col-md-4"
            key={acc._id}
          >

            <div className="card shadow-lg border-0 rounded-4 mb-4">

              <div className="card-body p-4">

                <h4 className="fw-bold mb-3">
                  Accountant #{index + 1}
                </h4>

                <p className="mb-2">
                  <b>Location:</b> {acc.location}
                </p>

                <p className="mb-2">
                  <b>Experience:</b> {acc.experience} years
                </p>

                <p className="mb-2">
                  <b>Services:</b>{" "}
                  {acc.specialization?.join(", ")}
                </p>

                <p className="text-muted small">
                  {acc.description}
                </p>

                <div className="d-flex justify-content-between mt-4">

                  <Link
                    to={`/accountants/${acc._id}`}
                    className="btn btn-outline-dark"
                  >
                    View
                  </Link>

                  <button
                    className="btn btn-warning"
                    onClick={() => handleSave(acc._id)}
                  >
                    ⭐ Save
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
    </>
);

};

export default Search;