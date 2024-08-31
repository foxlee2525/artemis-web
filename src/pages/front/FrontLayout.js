import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import MessageToast from "../../components/MessageToast";
import axios from "axios";

function FrontLayout() {
  const [cartData, setCartData] = useState(() => {
    // 從 localStorage 中初始化購物車數據
    const savedCart = localStorage.getItem("cartData");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [isLoading, setIsLoading] = useState(true);

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      // console.log(res);
      setCartData(res.data.data);
      localStorage.setItem("cartData", JSON.stringify(res.data.data));
    } catch (error) {
      console.log("Error getting cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/carts`);
      setCartData({});
      localStorage.removeItem("cartData"); // 清除 localStorage 中的 cartData
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    const initializeCart = async () => {
      // 如果 localStorage 中沒有保存的購物車數據，則 get API
      if (!cartData.carts || cartData.carts.length === 0) {
        try {
          await getCart();
          if (!cartData.carts || cartData.carts.length === 0) {
            await clearCart();
            await getCart(); // 在清空購物車後重新 get API
          }
        } catch (error) {
          console.error("Error initializing cart:", error);
        }
      }
    };
    initializeCart();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar cartData={cartData}></Navbar>
      {/* MessageToast */}
      <MessageToast></MessageToast>
      {/* Body */}
      <div className='content' style={{ minHeight: "100vh" }}>
        <Outlet context={{ getCart, cartData, setCartData, isLoading, setIsLoading }}></Outlet>
      </div>
      {/* Footer */}
      <Footer></Footer>
    </>
  );
}

export default FrontLayout;
