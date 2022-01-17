import {Link, withRouter} from "react-router-dom";
import {isAuthenticate, signout} from "../user/helper/apicalls";

function Menu({history}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light unicolor shadow  rounded">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  history.location.pathname === "/"
                    ? "nav-link active fw-bold"
                    : "nav-link fw-bold"
                }
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#">
                Cart
              </a>
            </li>
            <li className="nav-item">
              {isAuthenticate() && (
                <Link className="nav-link fw-bold">Profile</Link>
              )}
            </li>
            <li className="nav-item">
              {!isAuthenticate() && (
                <Link
                  to="/register"
                  className={
                    history.location.pathname === "/register"
                      ? "nav-link active fw-bold"
                      : "nav-link fw-bold"
                  }
                >
                  Register
                </Link>
              )}
            </li>
            <li className="nav-item">
              {!isAuthenticate() && (
                <Link
                  to="/login"
                  className={
                    history.location.pathname === "/login"
                      ? "nav-link active fw-bold"
                      : "nav-link fw-bold"
                  }
                >
                  Log In
                </Link>
              )}
            </li>
            <li className="nav-item float-end">
              {isAuthenticate() && (
                <Link
                  className="nav-link fw-bold text-danger"
                  onClick={() => {
                    signout(() => {
                      history.push("/login");
                    });
                  }}
                >
                  Log Out
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Menu);
