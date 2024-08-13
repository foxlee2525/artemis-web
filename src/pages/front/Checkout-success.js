import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function CheckoutSuccess() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});

  const getCart = async (orderId) => {
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

  useEffect(() => {
    getCart(orderId);
  }, [orderId]);

  return (
    <div className='container pt-8'>
      <ul className='d-flex justify-content-around w-md-75 w-100 w-lg-50 mx-auto'>
        <li className='d-flex flex-column align-items-center'>
          <div>1</div>
          <p>挑選產品</p>
        </li>
        <li className='d-flex flex-column align-items-center'>
          <div>2</div>
          <p>購物車</p>
        </li>
        <li className='d-flex flex-column align-items-center'>
          <div>3</div>
          <p>填寫資訊</p>
        </li>
        <li className='d-flex flex-column align-items-center'>
          <div>4</div>
          <p>確認付款</p>
        </li>
        <li className='d-flex flex-column align-items-center'>
          <div>5</div>
          <p>完成</p>
        </li>
      </ul>

      <div className='mt-5 mb-7'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>付款成功！</h2>
            <p>
              感謝您的購買！您的訂單已成功處理，我們正在會盡快安排發貨給您。
              <br />
              您的支持是我們最大的動力。我們致力於提供最優質的產品和服務，期待您再次光臨。
              <br />
              如果您有任何問題或需要協助，請隨時聯繫我們的客服團隊。
              <br />
              再次感謝您的信任與選擇。
            </p>
            <Link to='/' className='btn text-dark py-3 mt-md-0 mt-3'>
              <i className='bi bi-arrow-left'></i> 返回首頁
            </Link>
          </div>
          <div className='col-md-6'>
            <div className='rounded-0 py-4'>
              <div className='card-header border-bottom-0 bg-white px-4 py-0'>
                <h2>選購訂單細節</h2>
              </div>
              <div className='card-body px-4 py-0'>
                <ul className='list-group list-group-flush'>
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <li className='list-group-item px-0' key={item.id}>
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

                  <li className='list-group-item px-0 pb-0'>
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
                            ApplePay
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
      </div>
    </div>
  );
}

export default CheckoutSuccess;
