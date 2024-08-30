import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/FormElements";
import Loading from "../../components/Loading";
import axios from "axios";

function CheckoutConfirm() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const paymentMethod = localStorage.getItem("paymentMethod");
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const getOrderData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
        );
        setOrderData(res.data.order);
        setIsLoading(false);
        console.log(res.data.order);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    getOrderData();
  }, [orderId]);

  useEffect(() => {
    if (orderData?.create_at) {
      const timestamp = orderData.create_at;
      const date = new Date(timestamp * 1000);
      const formattedDate = date.toISOString().split("T")[0];
      setFormattedDate(formattedDate);
    }
  }, [orderData]);

  // 模擬付款
  const onSubmitPayment = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (paymentMethod === "ATM") {
          alert("訂單已成功送出！");
          scrollToTop();
          navigate(`/cart/checkout-success/${orderId}`);
        } else {
          alert("已成功付款！");
          scrollToTop();
          navigate(`/cart/checkout-success/${orderId}`);
        }
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <Loading isLoading={isLoading} />
      <div className='pt-5 pb-7'>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            {/* 聯絡資料 */}
            <div className='col-lg-8 col-md-10 col-12 bg-white pb-5 cart-summery-container'>
              <div className='d-flex text-bg-dark rounded-top'>
                <h4 className='m-2'>確認訂單資料</h4>
              </div>
              <div className='bg-light rounded-bottom px-8 pt-3 pb-2'>
                <table className='table'>
                  <tbody>
                    <tr>
                      <th
                        scope='row'
                        className='border-0 px-0 pt-2 font-weight-normal'
                      >
                        下訂日期：
                      </th>
                      <td className='text-end border-0 px-0 pt-2'>
                        {formattedDate}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope='row'
                        className='border-0 px-0 pt-2 font-weight-normal'
                      >
                        訂單編號：
                      </th>
                      <td className='text-end border-0 px-0 pt-2'>
                        {orderData?.id}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope='row'
                        className='border-0 px-0 pt-2 font-weight-normal'
                      >
                        顧客名稱：
                      </th>
                      <td className='text-end border-0 px-0 pt-2'>
                        {orderData?.user?.name}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope='row'
                        className='border-0 px-0 pt-2 font-weight-normal'
                      >
                        聯絡電話：
                      </th>
                      <td className='text-end border-0 px-0 pt-2'>
                        {orderData?.user?.tel}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope='row'
                        className='border-0 px-0 pt-2 font-weight-normal'
                      >
                        寄送地址：
                      </th>
                      <td className='text-end border-0 px-0 pt-2'>
                        {orderData?.user?.address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* 商品摘要 */}
              <div className='col-12 bg-white pt-4 pb-5 cart-summery-container'>
                <div className='d-flex text-bg-dark rounded-top'>
                  <h4 className='m-2'>確認商品</h4>
                </div>
                <div className='bg-light rounded-bottom p-4'>
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <div className='d-flex mt-2' key={item.id}>
                        <img
                          className='rounded-2 me-2'
                          src={item.product.imageUrl}
                          alt=''
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "cover",
                          }}
                        />
                        <div className='w-100'>
                          <div className='d-flex justify-content-between fw-bold'>
                            <p className='mb-0'>{item.product.title}</p>
                            <p className='mb-0'>x {item.qty}</p>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <p className='text-muted mb-0'>
                              <small>NT$ {item.product.price}</small>
                            </p>
                            <p className='mb-0'>NT$ {item.product.price}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <table className='table mt-4 border-top border-bottom'>
                    <tbody>
                      <tr>
                        <th
                          scope='row'
                          className='border-0 px-0 pt-4 font-weight-normal'
                        >
                          合計金額
                        </th>
                        <td className='text-end border-0 px-0 pt-4'>
                          NT$ {orderData.total}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope='row'
                          className='border-0 px-0 pt-0 pb-4 font-weight-normal'
                        >
                          付款方式
                        </th>
                        <td className='text-end border-0 px-0 pt-0 pb-4'>
                          {paymentMethod}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className='border-bottom d-flex justify-content-between mt-4 pb-4'>
                    <p className='mb-0 h4 fw-bold'>應付金額</p>
                    <p className='mb-0 h4 fw-bold'>NT$ {orderData.total}</p>
                  </div>
                  {!orderData.is_paid && (
                    <>
                      {paymentMethod === "ATM" && (
                        <div className='pt-4'>
                          <div className='text-center'>
                            <h5 className='fw-bold'>ATM 轉帳資訊</h5>
                            <p>( 請於 24 小時內完成轉帳 )</p>
                          </div>
                          <table className='table'>
                            <tbody>
                              <tr>
                                <th
                                  scope='row'
                                  className='border-0 px-0 fw-bold'
                                >
                                  銀行名稱：
                                </th>
                                <td className='text-end border-0 px-0 fw-bold'>
                                  XXXX銀行
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope='row'
                                  className='border-0 px-0 fw-bold'
                                >
                                  銀行戶口：
                                </th>
                                <td className='text-end border-0 px-0 fw-bold'>
                                  1234-5678-9012
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope='row'
                                  className='border-0 px-0 fw-bold'
                                >
                                  轉帳金額：
                                </th>
                                <td className='text-end border-0 px-0 fw-bold'>
                                  NT$ {orderData.total}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}

                      {paymentMethod === "信用卡" && (
                        <form className='mt-4'>
                          <h5>信用卡付款資訊</h5>
                          <div className='mb-2'>
                            <Input
                              id='cardNumber'
                              labelText='信用卡號碼'
                              type='text'
                              register={register}
                              errors={errors}
                              rules={{
                                required: "信用卡號碼為必填",
                                pattern: {
                                  value: /^[0-9]{16}$/,
                                  message: "信用卡號碼必須為 16 位數字",
                                },
                              }}
                            />
                          </div>
                          <div className='row'>
                            <div className='col-6 mb-2'>
                              <Input
                                id='expiryDate'
                                labelText='到期日 (MM/YY)'
                                type='text'
                                register={register}
                                errors={errors}
                                rules={{
                                  required: "到期日為必填",
                                  pattern: {
                                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                    message: "到期日格式錯誤，正確格式為 MM/YY",
                                  },
                                }}
                              />
                            </div>
                            <div className='col-6 mb-2'>
                              <Input
                                id='cvv'
                                labelText='CVV'
                                type='text'
                                register={register}
                                errors={errors}
                                rules={{
                                  required: "CVV 為必填",
                                  pattern: {
                                    value: /^[0-9]{3,4}$/,
                                    message: "CVV 必須為 3 或 4 位數字",
                                  },
                                }}
                              />
                            </div>
                          </div>
                        </form>
                      )}
                    </>
                  )}
                  <button
                    type='submit'
                    className={`btn btn-primary mt-3 py-3 w-100 rounded-2 ${
                      isLoading ? "bounceBack" : ""
                    }`}
                    disabled={isLoading}
                    onClick={onSubmitPayment}
                  >
                    {paymentMethod === "ATM"
                      ? isLoading
                        ? "送出訂單中..."
                        : "確認訂單"
                      : isLoading
                      ? "正在付款中..."
                      : "確認付款"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutConfirm;
