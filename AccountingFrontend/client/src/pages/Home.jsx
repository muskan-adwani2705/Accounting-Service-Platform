import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>

      <Navbar />
{/* HERO SECTION */}
      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
        }}
      >
        <div className="container">

          <h1 className="display-3 fw-bold mb-4">
            Find Trusted Financial Experts
          </h1>

          <p className="lead mb-5 text-light">
            AI-powered accountant discovery platform for SMEs and startups.
          </p>

          <div>
            <Link to="/register" className="btn btn-warning btn-lg px-5 me-3 fw-bold">
              Get Started
            </Link>
            <Link to="/search" className="btn btn-outline-light btn-lg px-5">
              Explore Experts
            </Link>
          </div>

        </div>
      </section>
      {/* FEATURES */}
      <section className="py-5 bg-light">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Platform Features</h2>
            <p className="text-muted">
              Designed for scalable financial networking
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card border-0 shadow-lg h-100 rounded-4 p-4 text-center">
                <i className="bi bi-cpu-fill display-3 text-primary mb-3"></i>
                <h4 className="fw-bold">AI Recommendations</h4>
                <p className="text-muted">
                  Smart accountant matching based on user preferences and search behavior.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-lg h-100 rounded-4 p-4 text-center">
                <i className="bi bi-patch-check-fill display-3 text-success mb-3"></i>
                <h4 className="fw-bold">Verified Experts</h4>
                <p className="text-muted">
                  Admin-verified accountants for trusted financial services.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-lg h-100 rounded-4 p-4 text-center">
                <i className="bi bi-graph-up-arrow display-3 text-warning mb-3"></i>
                <h4 className="fw-bold">Business Growth</h4>
                <p className="text-muted">
                  Connect SMEs with financial experts to improve decision making.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* STATS */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container">

          <div className="row">

            <div className="col-md-4 mb-4">
              <h1 className="fw-bold">500+</h1>
              <p>Verified Accountants</p>
            </div>

            <div className="col-md-4 mb-4">
              <h1 className="fw-bold">1200+</h1>
              <p>SMEs Connected</p>
            </div>

            <div className="col-md-4 mb-4">
              <h1 className="fw-bold">98%</h1>
              <p>User Satisfaction</p>
            </div>
    </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-4">
        <p className="mb-0">
          © 2026 FinMatch AI — Final Year Major Project
        </p>
      </footer>

    </div>
  );
};

export default Home;