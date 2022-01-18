import {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticate} from "../user/helper/apicalls";
import {orderProducts} from "./helper/apicalls";
import {cartEmpty, loadCart} from "./helper/carthelper";

function PaymentForm() {
  const [values, setValues] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    loading: false,
    error: "",
    success: false,
    redirect: false,
  });

  const [products, setProducts] = useState([]);

  const {user, token} = isAuthenticate();
  const {address, city, state, pincode, loading, error, success, redirect} =
    values;

  const preload = () => {
    setProducts(loadCart());
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: "",
      loading: false,
      success: false,
      redirect: false,
      [name]: e.target.value,
    });
    const orderProducts = products.map((p) => {
      return p._id;
    });
  };

  const totalAmount = () => {
    let sum = 0;
    products?.map((p) => (sum += p.price));
    return sum;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({...values, loading: true});

    const orderProduct = products.map((p) => {
      return {product: p._id};
    });
    const order = {
      products: orderProduct,
      address,
      state,
      city,
      pincode,
      user: user._id,
      totalPrice: totalAmount(),
    };

    orderProducts(order).then((data) => {
      if (!data.success) {
        setValues({
          ...values,
          loading: false,
          success: false,
          redirect: false,
          error: data.message,
        });
      } else {
        setValues({
          ...values,
          address: "",
          state: "",
          city: "",
          pincode: "",
          loading: true,
          success: true,
        });
        setTimeout(() => {
          setValues({...values, redirect: true});
        }, 3000);
      }
    });
    cartEmpty();
  };

  const backButton = () => {
    return (
      <Link to="/cart" style={{marginLeft: "200px", marginTop: "20px"}}>
        <button className="btn btn-warning btn-sm rounded mb-3">back</button>
      </Link>
    );
  };

  const handleError = () => {
    return <p style={{color: "red"}}>{error}</p>;
  };

  const handleSuccess = () => {
    return <p style={{color: "green"}}>Order Successfully</p>;
  };

  const redirectUser = () => {
    return redirect && <Redirect to="/cart"></Redirect>;
  };

  return (
    <div className="row" style={{marginBottom: "5px"}}>
      {backButton()}

      <div className="mt-5 col-md-6 offset-4 text-left">
        <h2>Order Detail</h2>
        {success && handleSuccess()}
        {error && handleError()}
        {redirect && redirectUser()}
        <form>
          <div className="form-group">
            <label className="">Address</label>
            <textarea
              onChange={handleChange("address")}
              className="form-control w-75"
              type="text"
              value={address}
            />
          </div>
          <div className="form-group my-3">
            <label className="">City</label>
            <input
              onChange={handleChange("city")}
              className="form-control w-50"
              type="text"
              value={city}
            />
          </div>
          <div className="form-group my-3">
            <label className="">State</label>
            <input
              onChange={handleChange("state")}
              className="form-control w-50"
              type="text"
              value={state}
            />
          </div>
          <div className="form-group my-3">
            <label className="">Pin code</label>
            <input
              onChange={handleChange("pincode")}
              className="form-control w-50"
              type="number"
              value={pincode}
            />
          </div>
          <div>
            <p>
              total Amount :{" "}
              <span className="fw-bold">${totalAmount()}.00</span>
            </p>
          </div>
          <div>
            <p>
              Payment method :{" "}
              <span className="fw-bold"> Cash on delivery</span>
            </p>
          </div>
          <div className="d-grid gap-2 w-25">
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
                "Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
