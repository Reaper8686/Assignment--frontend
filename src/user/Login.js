import {useState} from "react";
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";
import {authenticate, isAuthenticate, loginUser} from "./helper/apicalls";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    redirect: false,
    loading: false,
  });

  const {email, password, error, success, redirect, loading} = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: "",
      success: false,
      redirect: false,
      loading: false,
      [name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({...values, loading: true});
    loginUser({email, password}).then((data) => {
      if (!data?.success) {
        console.log("errrrr");
        setValues({
          ...values,
          error: data.message,
          success: false,
          loading: false,
          redirect: false,
        });
      } else {
        authenticate(data, () => {
          console.log("successs");
          setValues({
            ...values,
            email: "",
            password: "",
            error: "",
            success: true,
            loading: false,
            redirect: true,
          });
        });
      }
    });
  };

  const handleError = () => {
    return <p style={{color: "red"}}>{error}</p>;
  };

  const handleSuccess = () => {
    return <p style={{color: "green"}}>Logined Successfully</p>;
  };

  const redirectUser = () => {
    if (redirect || isAuthenticate()) {
      return <Redirect to="/" />;
    }
  };

  const loginForm = () => {
    return (
      <div className="row" style={{marginBottom: "257px"}}>
        <div className="col-md-6 offset-sm-4 text-left">
          {success && handleSuccess()}
          {error && handleError()}
          {redirectUser()}
          <form>
            <div className="form-group my-3">
              <label>Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control w-75"
                type="email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control w-75"
                type="password"
              />
            </div>
            <div className="d-grid gap-2 w-75">
              <button
                onClick={onSubmit}
                className="btn unicolor my-3 rounded"
                type="button"
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <p>
            Don't have a account? create your account{" "}
            <Link to="/register">here</Link>
          </p>
        </div>
      </div>
    );
  };
  return <Base title="Login">{loginForm()}</Base>;
}

export default Login;
