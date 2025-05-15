import { Link, useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-3">
          <span className="text-danger">Oops!</span> Page not found.
        </p>
        <p className="lead">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary"   onClick={() => navigate(-1)}>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
