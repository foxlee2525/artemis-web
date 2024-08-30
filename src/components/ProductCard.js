import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../slice/messageSlice";
import axios from "axios";

function ProductCard({ product, getCart }) {
  const dispatch = useDispatch();

  const addToCart = async (item, cartQuantity) => {
    const data = {
      data: {
        product_id: item.id,
        qty: cartQuantity,
      },
    };
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      // console.log(res);
      dispatch(createAsyncMessage(res.data));
      getCart();
    } catch (error) {
      console.log(error);
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className='card border-0 rounded-1 shadow-sm w-100'
      style={{
        backgroundColor: "#faf9f8",
      }}
    >
      <div className='p-3'>
        <Link to={`/product/${product.id}`} onClick={() => scrollToTop()}>
          <img
            src={product?.imageUrl}
            className='card-img-top object-cover rounded-3'
            height={280}
            alt={product.title}
          />
        </Link>
        <div className='card-body px-0'>
          <div className='d-flex align-items-center justify-content-between mt-2'>
            <div>
              <h6 className='card-title mb-1'>{product.title}</h6>
              <span>NT$ {product.price}</span>
            </div>
            <div className='d-flex'>
              {/* <div className='icon-hover fs-3'>
                <i className='bi bi-bookmark-heart-fill'></i>
              </div>*/}
              <div
                className='icon-hover fs-3'
                onClick={() => addToCart(product, 1)}
              >
                <i className='bi bi-file-plus-fill'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
