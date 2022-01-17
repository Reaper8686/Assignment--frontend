import Base from "../core/Base";
import {Link} from "react-router-dom";
import {useState} from "react";
import {registerUser} from "./helper/apicalls";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    success: false,
  });

  const {name, email, password, error, loading, success} = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      success: false,
      loading: false,
      [name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({...values, error: "", success: false, loading: true});
    registerUser({name, email, password}).then((data) => {
      if (!data?.success) {
        setValues({
          ...values,
          error: "*fill fields properly",
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
          loading: false,
        });
      }
    });
  };

  const handleError = () => {
    return <p style={{color: "red"}}>{error}</p>;
  };

  const handleSuccess = () => {
    return (
      <p style={{color: "green"}}>
        Registered Successfully <Link to="/login">Login here</Link>
      </p>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row" style={{marginBottom: "5px"}}>
        <div className="col-md-6 offset-sm-4 text-left">
          {error && handleError()}
          {success && handleSuccess()}
          <form>
            <div className="form-group">
              <label className="">Name</label>
              <input
                onChange={handleChange("name")}
                className="form-control w-75"
                type="text"
                value={name}
              />
            </div>
            <div className="form-group my-3">
              <label className="">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control w-75"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control w-75"
                type="password"
                value={password}
              />
            </div>
            <div className="d-grid gap-2 w-75">
              <button
                onClick={onSubmit}
                className="btn unicolor my-3 rounded py-2"
                type="button"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
          <p className="ms-1">
            Already Registered? signin from <Link to="/login">here</Link>
          </p>
        </div>
      </div>
    );
  };

  return (
    <Base title="Register" description="Create Your Account">
      <div>{signUpForm()}</div>
    </Base>
  );
}

export default Register;
