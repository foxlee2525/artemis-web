import { NavLink, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import ServicesList from "../../components/ServicesList";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import axios from "axios";

function Home() {
  const { cartData, setCartData, getCart } = useOutletContext();
  const [productAll, setProductAll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProductAll = async () => {
    setIsLoading(true);
    try {
      const productResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      // console.log(productResult);
      setProductAll(productResult.data.products);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
    getProductAll();
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      {/* 橫幅 */}
      <div
        className='banner container-fluid d-flex align-items-center justify-content-center'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608508644127-ba99d7732fee?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(80, 40, 120, 0.5)",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        ></div>
        <div className='text-center position-relative'>
          <h1 className='text-white'>A R T E M I S</h1>
          <NavLink
            to='/products'
            className='btn btn-primary rounded-2 text-white mt-4'
            onClick={() => scrollToTop()}
          >
            立刻選購
          </NavLink>
        </div>
      </div>
      {/* 精選商品 */}
      <div className='container mt-5'>
        <h2 className='text-center text-secondary mb-4'>精選商品</h2>
        <div className='row'>
          {productAll?.slice(0, 4).map((product) => (
            <div className='col-lg-3 col-6 mb-4' key={product.id}>
              <ProductCard
                product={product}
                cartData={cartData}
                setCartData={setCartData}
                getCart={getCart}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 品牌故事 */}
      <div className='container mt-5'>
        <div className='row align-items-center bg-light rounded-3 p-4'>
          <div className='col-md-6'>
            <img
              src='https://images.unsplash.com/photo-1584811644165-33db3b146db5'
              alt='品牌故事圖1'
              className='img-fluid w-100 rounded-3'
              style={{ height: "280px", objectFit: "cover" }}
            />
          </div>
          <div className='col-md-6 mt-4 mt-md-0'>
            <h2 className='fw-bold text-secondary pt-2 p-md-0'>品牌故事</h2>
            <h6 className='fw-bold pt-2'>
              彌絲秉持著「飾品不僅是點綴，更是心靈的外在表現」的理念。
              我們相信，飾品不僅僅是一件配件，它更能夠表達個人內心的情感、生活態度以及對美的追求。
            </h6>
            <h6 className='fw-bold pt-2'>
              彌絲，象徵著我們對美的追求，及每一位女性自信與優雅的展現。
            </h6>
            <NavLink
              to='/about'
              className='btn btn-primary mt-3'
              onClick={() => scrollToTop()}
            >
              閱讀更多
            </NavLink>
          </div>
        </div>
      </div>
      {/* 額外服務 */}
      <div className='mt-6'>
        <ServicesList />
      </div>
    </>
  );
}

export default Home;
