import {useState, useEffect} from "react";
import Base from "./Base";
import Card from "./Card";
import {AllProducts} from "./helper/apicalls";
import {loadCart} from "./helper/carthelper";

function Home() {
  const [products, setProducts] = useState([]);
  // const [cartAdded, setCartAdded] = useState(false);

  const preload = () => {
    AllProducts().then((data) => {
      setProducts(data.products);
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Home Page">
      <div className="row">
        {products?.map((product, index) => {
          let added;
          loadCart()?.map((p) => {
            if (product?._id === p?._id) {
              added = true;
            }
          });
          return (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
              <Card
                product={product}
                addCart={true}
                removeCart={false}
                added={added}
              ></Card>
            </div>
          );
        })}
      </div>
    </Base>
  );
}

export default Home;
