import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { Input, Select, CheckboxRadio } from "../../components/FormElements";
import { useEffect, useState } from "react";
import axios from "axios";

const localAxios = axios.create({
  baseURL: "",
});

function Checkout() {
  const { cartData } = useOutletContext();
  const [addressData, setAddressData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, tel } = data;
    // console.log(name, email, tel, fullAddress);
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address: fullAddress,
        },
      },
    };
    try {
      const res = await axios.post(
        `v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );
      console.log(res);
      navigate(`/success/${res.data.orderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const watchEmail = useWatch({
    control,
    name: "email",
  });

  const watchCity = useWatch({
    control,
    name: "city",
  });
  const watchDistrict = useWatch({
    control,
    name: "district",
  });
  const watchAddress = useWatch({
    control,
    name: "address",
  });

  useEffect(() => {
    async function getAddressData() {
      try {
        const response = await localAxios.get("/assets/taiwan.json");
        setAddressData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getAddressData();
  }, []);

  useEffect(() => {
    // 根據 縣市 來動態顯示 鄉鎮
    if (watchCity) {
      const selectedCity = addressData.find(
        (item) => item.CityName === watchCity
      );
      if (selectedCity) {
        setDistricts(selectedCity.AreaList);
      }
    } else {
      setDistricts([]);
    }
  }, [watchCity, addressData]);

  useEffect(() => {
    // 將 city, district, address 串成完整地址
    setFullAddress(
      `${watchCity || ""} ${watchDistrict || ""} ${watchAddress || ""}`.trim()
    );
  }, [watchCity, watchDistrict, watchAddress]);

  useEffect(() => {
    // 驗證 Email
    setUserEmail(watchEmail);
  }, [watchEmail]);

  return (
    <div className='container'>
      <div className='pt-5 pb-7'>
        <div className='container'>
          <Link to='/cart' className='btn text-dark py-3 mt-md-0 mt-3'>
            <i className='bi bi-arrow-left'></i> 返回購物車
          </Link>

          <div className='row flex-md-row'>
            {/* 訂單摘要 */}
            <div className='col-lg-4 col-12 bg-white pt-4 pb-5 pt-lg-0 cart-summery-container'>
              <div className='d-flex text-bg-dark rounded-top'>
                <h4 className='m-2'>訂單摘要</h4>
              </div>
              <div className='bg-light rounded-bottom p-4'>
                {cartData?.carts?.map((item) => {
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
                            <small>NT$ {item.final_total}</small>
                          </p>
                          <p className='mb-0'>NT$ {cartData.total}</p>
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
                        NT$ {cartData.final_total}
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
                        {paymentMethod > 0 ? paymentMethod : "未選擇付款方式"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='d-flex justify-content-between mt-4'>
                  <p className='mb-0 h4 fw-bold'>應付金額</p>
                  <p className='mb-0 h4 fw-bold'>NT$ {cartData.final_total}</p>
                </div>
              </div>

              <div className='bg-light rounded-2 mt-3 p-4'>
                <h5 className='mb-2'>
                  <strong>商品購買須知</strong>
                </h5>
                <p>
                  感謝您選擇彌絲的產品。
                  <br />
                  以下是購買須知，請您仔細閱讀：
                  <br />
                  產品因拍攝環境的關係，顏色可能會略有差異，實際顏色請以廠商出貨為準。
                  <br />
                  商品情境照片僅供參考，圖片中僅顯示商品主體，不包含其他配件，請以規格內容物為準。
                  <br />
                </p>
                <p>
                  彌絲將盡可能確保所列商品備貨充足，但偶爾仍會有產品售罄的情況。如您所訂購的商品庫存不足，我們將盡快以電子郵件通知您。
                </p>
                <p>
                  任何訂單的變動均會反映在訂單總額與出貨訊息中，請隨時關注您的訂單狀態。
                  <br />
                  感謝您的理解與支持，祝您購物愉快！
                </p>
                <br />
                如有任何疑問，歡迎隨時聯絡我們的客服團隊，我們將竭誠為您服務。
              </div>
            </div>

            {/* 聯絡資料 */}
            <div className='col-lg-8 col-12'>
              <div className='d-flex text-bg-dark rounded-top'>
                <h4 className='m-2'>聯絡資料</h4>
              </div>
              <div className='bg-light p-4 rounded-bottom'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-2'>
                    <Input
                      id='name'
                      type='text'
                      errors={errors}
                      labelText='名稱'
                      register={register}
                      rules={{
                        required: "使用者名稱為必填",
                        maxLength: {
                          value: 10,
                          message: "使用者名稱長度不超過 10",
                        },
                      }}
                    ></Input>
                  </div>
                  <div className='mb-2'>
                    <Input
                      id='email'
                      labelText='電子信箱'
                      type='email'
                      errors={errors}
                      register={register}
                      rules={{
                        required: "Email 為必填",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email 格式不正確",
                        },
                      }}
                    ></Input>
                  </div>
                  <div className='mb-2'>
                    <Input
                      id='confirmEmail'
                      labelText='確認電子信箱'
                      type='email'
                      errors={errors}
                      register={register}
                      rules={{
                        required: "確認 Email 為必填",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email 格式不正確",
                        },
                        validate: (value) =>
                          value === userEmail || "請重新確認 Email",
                      }}
                    ></Input>
                  </div>
                  <div className=''>
                    <Input
                      id='tel'
                      labelText='聯絡電話'
                      type='tel'
                      errors={errors}
                      register={register}
                      rules={{
                        required: "聯絡電話為必填",
                        minLength: {
                          value: 10,
                          message: "請輸入正確電話號碼",
                        },
                        maxLength: {
                          value: 10,
                          message: "請輸入正確電話號碼",
                        },
                      }}
                    ></Input>
                  </div>
                </form>
              </div>

              {/* 配送地址 */}
              <div className='mt-3'>
                <div className='d-flex text-bg-dark rounded-top'>
                  <h4 className='m-2'>配送地址</h4>
                </div>
                <div className='bg-light p-4 rounded-2'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-row'>
                      <div className='col mb-2'>
                        <Select
                          id='city'
                          labelText='縣市'
                          defaultValue=''
                          errors={errors}
                          register={register}
                          rules={{
                            required: "縣市為必填",
                          }}
                        >
                          <option value='' disabled>
                            請選擇縣市
                          </option>
                          {addressData.map((city) => {
                            return (
                              <option value={city.CityName} key={city.CityName}>
                                {city.CityName}
                              </option>
                            );
                          })}
                        </Select>
                      </div>
                      <div className='col mb-2'>
                        <Select
                          id='district'
                          labelText='鄉鎮市區'
                          errors={errors}
                          register={register}
                          disabled={!getValues().city}
                          rules={{
                            required: "鄉鎮市區為必填",
                          }}
                        >
                          <option value='' disabled={getValues().city}>
                            請選擇鄉鎮市區
                          </option>
                          {districts.map((district) => (
                            <option
                              value={district.AreaName}
                              key={district.AreaName}
                            >
                              {district.AreaName}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <Input
                      id='address'
                      labelText='地址'
                      type='address'
                      errors={errors}
                      register={register}
                      rules={{
                        required: "地址為必填",
                      }}
                    ></Input>
                    <p className='mt-4 mb-2'>請選擇付款方式</p>
                    <div className='form-check mb-2 ps-0'>
                      <CheckboxRadio
                        type='radio'
                        name='payment'
                        id='paymentATM'
                        labelText='ATM'
                        value={true}
                        register={register}
                        errors={errors}
                        rules={{
                          required: "請選擇付款方式",
                        }}
                        onClick={() => setPaymentMethod("ATM")}
                      ></CheckboxRadio>
                    </div>
                    <div className='form-check mb-2 ps-0'>
                      <CheckboxRadio
                        type='radio'
                        name='payment'
                        id='paymentCreditCard'
                        labelText='信用卡'
                        value={true}
                        register={register}
                        errors={errors}
                        rules={{
                          required: "請選擇付款方式",
                        }}
                        onClick={() => setPaymentMethod("信用卡")}
                      ></CheckboxRadio>
                    </div>
                    <div className='mt-4 pt-3 border-top'>
                      <CheckboxRadio
                        type='checkbox'
                        name='isCheckForm'
                        id='isCheckForm'
                        value={true}
                        register={register}
                        errors={errors}
                        rules={{ required: "請閱讀商品購買須知後勾選同意" }}
                        labelText='我已閱讀並理解網站的商品購買須知'
                      ></CheckboxRadio>
                    </div>
                    <button
                      type='submit'
                      className='btn btn-primary mt-3 py-3 w-100 rounded-2'
                    >
                      確認訂單
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
