import {API} from "../../backendApi";

function ImageHelper({product}) {
  return (
    <div>
      <img
        src={`${API}/product/photo/${product._id}`}
        alt="photo"
        style={{maxHeight: "100%", maxWidth: "100%"}}
        className="card-img-top"
      />
    </div>
  );
}

export default ImageHelper;
