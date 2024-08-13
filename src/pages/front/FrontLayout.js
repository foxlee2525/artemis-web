import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import MessageToast from "../../components/MessageToast";
import axios from "axios";

function FrontLayout() {
  const [cartData, setCartData] = useState({});

  const getCart = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    try {
      // console.log(res);
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar cartData={cartData}></Navbar>
      {/* MessageToast */}
      <MessageToast></MessageToast>
      {/* Body */}
      <div className='content' style={{ minHeight: "100vh" }}>
        <Outlet context={{ getCart, cartData, setCartData }}></Outlet>
      </div>
      {/* Footer */}
      <Footer></Footer>
    </>
  );
}

export default FrontLayout;
