import {useEffect, useState} from "react";
import Card from "./Card";
import Base from "./Base";
import {loadCart} from "./helper/carthelper";
import {isAuthenticate} from "../user/helper/apicalls";
import {Link} from "react-router-dom";
import PaymentForm from "./PaymentForm";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const {user, token} = isAuthenticate();

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const totalAmount = () => {
    let sum = 0;
    products?.map((p) => (sum += p.price));
    return sum;
  };

  const backButton = () => {
    return (
      <Link to="/">
        <button className="btn btn-warning btn-sm rounded mb-3">back</button>
      </Link>
    );
  };

  return (
    <Base title="Cart & Payment">
      {backButton()}

      <div className="row" style={{marginBottom: "245px"}}>
        <div className="col-6">
          <div className="row">
            {products?.length > 0 ? (
              products?.map((product, index) => {
                return (
                  <div key={index} className="col-6">
                    <Card
                      product={product}
                      addCart={false}
                      removeCart={true}
                      setReload={setReload}
                      reload={reload}
                      added={false}
                    />
                  </div>
                );
              })
            ) : (
              <p>Cart is Empty!!!</p>
            )}
          </div>
        </div>
        <div className="col-6 text-center">
          <h3 className="text-center">Total {products?.length} products</h3>
          <div className="m-3 p-2 rounded">
            <div className="row border-bottom m-2 border-1 border-light">
              <div className="col-6">
                <h4>Name</h4>
              </div>
              <div className="col-6">
                <h4>Price</h4>
              </div>
            </div>
            {products?.map((p) => {
              return (
                <div key={p._id} className="row">
                  <div className="col-6">{p.name}</div>
                  <div className="col-6">${p.price}.00</div>
                </div>
              );
            })}
            <div className="row ">
              <div className="col-6 fw-bold p-3">
                <span className="  ">total:</span>
              </div>
              <div className="col-6 fw-bold p-3">
                <span className="">${totalAmount()}.00</span>
              </div>
            </div>
          </div>
          {user && products?.length > 0 ? (
            <Link className="unicolor btn" to="/order">
              Confirm Order
            </Link>
          ) : (
            <p>
              Add products to cart or <Link to="/login">login</Link>
            </p>
          )}
        </div>
      </div>
    </Base>
  );
}

export default Cart;
