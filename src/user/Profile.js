import {useEffect, useState} from "react";
import Base from "../core/Base";
import {isAuthenticate, orderDetails} from "./helper/apicalls";

function Profile() {
  const [orders, setOrders] = useState([]);

  const {user} = isAuthenticate();

  const preload = () => {
    orderDetails(user._id).then((data) => setOrders(data.orders));
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Profile">
      <div style={{marginBottom: "275px"}}>
        <div className="card w-25 shadow mb-5">
          <div className="card-body">
            <h5 className="card-title">
              Name: <span className="fw-bold">{user.name}</span>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {" "}
              Email: <span className="fw-bold">{user.email}</span>
            </h6>
          </div>
        </div>

        <h1>My orders</h1>
        <hr />
        {orders.length > 0 ? (
          orders?.map((order) => {
            return (
              <div key={order._id} className="card w-50 shadow mb-5">
                <div className="card-body">
                  <p>
                    Order id : <span className="fw-bold">{order._id}</span>
                  </p>
                  <div>
                    <h6>Products:</h6>
                    <ul>
                      {order?.products?.map((product) => {
                        return (
                          <li key={product.product._id}>
                            name:
                            <span className="fw-bold ms-2">
                              {" "}
                              {product.product.name}{" "}
                            </span>{" "}
                            | price:
                            <span className="fw-bold ms-2">
                              ${product.product.price}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <p>
                    Totol Price:{" "}
                    <span className="fw-bold"> {order.totalPrice}</span>
                  </p>

                  <p>
                    Status:{" "}
                    <span className="fw-bold text-success">Shipping</span>
                  </p>
                  <p>
                    Order Date:{" "}
                    <span className="fw-bold">
                      {" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h4>No Orders</h4>
        )}
      </div>
    </Base>
  );
}

export default Profile;
