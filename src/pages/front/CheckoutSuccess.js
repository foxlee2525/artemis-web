import { Link, useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import RecommendedProducts from "../../components/RecommendedProducts";
import axios from "axios";

function CheckoutSuccess() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  const paymentMethod = localStorage.getItem("paymentMethod");
  // for 猜你喜歡 使用
  const { cartData, getCart } = useOutletContext();
  const [products, setProducts] = useState([]);

  const getProducts = async (page = 1) => {
    const productResult = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    const productData = productResult.data.products;
    // console.log(productData);
    setProducts(productData);
  };

  const getOrder = async (orderId) => {
    try {
      const res = await axios.get(
        `v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );
      console.log(res);
      setOrderData(res.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <div className='container'>
      <div className='mt-5 mb-7 mx-2'>
        <div className='row'>
          <div className='col-md-6 rounded-2 bg-light bg-md-transparent px-4 py-4 mb-4 px-md-0 py-md-0 mb-md-0'>
            <h2>訂單已成功送出！</h2>
            <div className='pt-2'>
              <p>
                感謝您的購買！您的訂單已成功處理，我們會盡快安排發貨給您。
                <br />
                我們致力於提供最優質的產品和服務，您的支持是我們最大的動力。
              </p>
              <p>
                如果您有任何問題或需要協助，請隨時聯繫我們的客服團隊。
                <br />
                再次感謝您的信任與選擇！期待您再次光臨。
              </p>
            </div>
            <button
              type='button'
              className='btn btn-primary mt-3 px-6 py-3 w-lg-50 w-100 rounded-2'
            >
              <Link to='/' className='text-white' onClick={() => scrollToTop()}>
                返回首頁
              </Link>
            </button>
          </div>
          <div className='col-md-6 px-0 ps-md-4'>
            <div className='d-flex text-bg-dark rounded-top'>
              <h4 className='m-2'>選購商品細節</h4>
            </div>
            <div className='bg-light rounded-bottom px-4 pt-3 pb-4'>
              <ul className='list-group list-group-flush'>
                {Object.values(orderData?.products || {}).map((item) => {
                  return (
                    <li
                      className='list-group-item px-0'
                      key={item.id}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <div className='d-flex mt-2'>
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className='me-2 rounded-2'
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                        <div className='w-100 d-flex flex-column'>
                          <div className='d-flex justify-content-between fw-bold'>
                            <h5>{item.product.title}</h5>
                            <p className='mb-0'>x {item.qty}</p>
                          </div>
                          <div className='d-flex justify-content-between mt-auto'>
                            <p className='text-muted mb-0'>
                              <small>NT$ {item.total}</small>
                            </p>
                            <p className='mb-0'>NT$ {item.total}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}

                <li
                  className='list-group-item px-0 pb-0'
                  style={{ backgroundColor: "transparent" }}
                >
                  <table className='table text-muted'>
                    <tbody>
                      <tr>
                        <th
                          scope='row'
                          className='border-0 px-0 font-weight-normal'
                        >
                          應付金額
                        </th>
                        <td className='text-end border-0 px-0'>
                          NT$ {orderData.total}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope='row'
                          className='border-0 px-0 pt-0 font-weight-normal'
                        >
                          付款方式
                        </th>
                        <td className='text-end border-0 px-0 pt-0'>
                          {paymentMethod}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className='d-flex justify-content-between mt-2'>
                    <p className='mb-0 h4 fw-bold'>付款金額</p>
                    <p className='mb-0 h4 fw-bold'>NT$ {orderData.total}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <RecommendedProducts
        products={products}
        getCart={getCart}
        cartData={cartData}
      />
    </div>
  );
}

export default CheckoutSuccess;
