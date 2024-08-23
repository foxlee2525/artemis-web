import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import axios from "axios";

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItems, setLoadingItems] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const dispatch = useDispatch();

  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItems([...loadingItems, item.id]);
    try {
      const res = await axios.put(
        `v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      // console.log(res);
      setLoadingItems(
        loadingItems.filter((loadingObject) => loadingObject !== item.id)
      );
      dispatch(createAsyncMessage(res.data));
      getCart();
    } catch (error) {
      console.log(error);
      setLoadingItems(
        loadingItems.filter((loadingObject) => loadingObject !== item.id)
      );
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  return (
    <div className='container'>
      {/* 購物車 */}
      <div className='row justify-content-center'>
        <div className='col-lg-8 col-12 bg-white pt-5 py-lg-5 mb-lg-4 cart-container'>
          <div className='d-flex justify-content-between text-bg-dark rounded-top'>
            <h4 className='m-2'>您的購物車</h4>
          </div>
          <div className='cart-detail rounded-bottom p-4'>
            {cartData?.carts?.map((item) => {
              return (
                <div
                  className='d-flex justify-content-between mt-4 bg-light rounded-2'
                  key={item.id}
                >
                  <img
                    className='rounded-4 p-2'
                    src={item.product.imageUrl}
                    alt=''
                    style={{
                      width: "120px",
                      height: "120px",
                    }}
                  />
                  <div className='d-flex justify-content-between align-items-center w-100 p-3'>
                    <p className='mb-0 fw-bold'>{item.product.title}</p>
                    <div className='d-flex flex-column flex-md-row align-items-center w-md-50'>
                      <p className='mb-0 fw-bold w-md-75'>
                        NT$ {item.final_total}
                      </p>
                      <div className='input-group mt-2 m-md-0'>
                        <select
                          name=''
                          className='form-select'
                          id=''
                          value={item.qty}
                          disabled={loadingItems.includes(item.id)}
                          onChange={(e) => {
                            updateCartItem(item, e.target.value * 1);
                          }}
                        >
                          {[...new Array(20)].map((i, num) => {
                            return (
                              <option value={num + 1} key={num}>
                                {num + 1}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <button
                      type='button'
                      className='d-flex btn fs-4'
                      style={{ top: "16px", right: "16px" }}
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                      onClick={() => removeCartItem(item.id)}
                    >
                      {hoveredItemId === item.id ? (
                        <i className='bi bi-trash3-fill'></i>
                      ) : (
                        <i className='bi bi-trash3'></i>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* 訂單摘要 */}
        <div className='col-lg-4 col-12 bg-white pt-4 pb-5 pt-lg-5 cart-summery-container'>
          <div className='d-flex justify-content-between text-bg-dark rounded-top'>
            <h4 className='m-2'>訂單摘要</h4>
          </div>
          <div className='cart-detail rounded-bottom p-4'>
            <table className='table text-muted'>
              <tbody>
                <tr>
                  <th scope='row' className='border-0 px-0 font-weight-normal'>
                    總計
                  </th>
                  <td className='text-end border-0 px-0'>
                    NT$ {cartData.total}
                  </td>
                </tr>
                <tr>
                  <th
                    scope='row'
                    className='border-0 px-0 pt-0 font-weight-normal'
                  >
                    折扣後總計
                  </th>
                  <td className='text-end border-0 px-0 pt-0'>
                    NT$ {cartData.final_total}
                  </td>
                </tr>
                <tr>
                  <th
                    scope='row'
                    className='border-0 px-0 pt-0 font-weight-normal'
                  >
                    運送費用
                  </th>
                  <td className='text-end border-0 px-0 pt-0'>免費</td>
                </tr>
                <tr className='border-top'>
                  <th scope='row' className='border-0 px-0 pt-2 h5 fw-bold'>
                    合計金額
                  </th>
                  <td className='text-end border-0 px-0 pt-2 h5 fw-bold'>
                    NT$ {cartData.final_total}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className='d-flex flex-column text-bg-light rounded-2 border mt-4 p-3'>
              <p className='mb-0 w-100'>優惠碼</p>
              <div className='input-group mt-2 w-100'>
                <input className='form-control' type='text' />
                <button className='btn btn-dark '>套用</button>
              </div>
            </div>
            <Link
              to='/cart/checkout'
              className={`btn w-100 mt-4 rounded-2 py-3 ${
                loadingItems.length > 0 ? "btn-primary disabled" : "btn-primary"
              }`}
            >
              繼續付款
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
