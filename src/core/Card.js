import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ImageHelper from "./helper/ImageHelper";
import {addProductToCart, removeProductFromCart} from "./helper/carthelper";

function Card({addCart, removeCart, product, setReload, reload, added}) {
  const [redirect, setRiderect] = useState(false);

  const redirectTo = () => {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  };

  const addToCart = () => {
    addProductToCart(product, () => {
      setRiderect(true);
    });
  };

  const removeFromCart = () => {
    removeProductFromCart(product._id);
    setReload(!reload);
  };

  return (
    <div
      className="card mb-3 border border-1 border-light"
      style={{height: "25rem"}}
    >
      <ImageHelper product={product} />
      {redirectTo()}

      <div className="card-body">
        <h5 className="card-title fw-bold text-center">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="m-0 p-0   w-25 text-center fw-bold">${product.price}</p>
        {addCart && !added ? (
          <button onClick={addToCart} className="btn  unicolor px-5 my-4 mb-2">
            Add to Cart
          </button>
        ) : (
          <span className="badge bg-success my-4">Added to cart</span>
        )}
        {removeCart && (
          <button
            onClick={removeFromCart}
            className="btn  btn-outline-danger ms-3"
          >
            Remove from cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
