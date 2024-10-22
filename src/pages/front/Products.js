import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useOutletContext } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";

function Products() {
  const { cartData, setCartData, getCart } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("全部商品");

  const getProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const productResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
      );
      // console.log(productResult);
      setProducts(productResult.data.products);
      setPagination(productResult.data.pagination);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getProductCategory = async (category) => {
    setIsLoading(true);
    try {
      const productResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?category=${category}`
      );
      // console.log(productResult);
      setProducts(productResult.data.products);
      setPagination(productResult.data.pagination);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    if (category === "全部商品") {
      getProducts(1);
    } else {
      getProductCategory(category);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  useEffect(() => {
    getProductAll();
  }, []);

  return (
    <>
      <div className='container mt-md-5 mt-3 mb-7'>
        <Loading isLoading={isLoading} />
        <ol className='breadcrumb mb-4 ms-4 ms-md-2'>
          <li className='breadcrumb-item text-primary'>
            <NavLink to='/' className='nav-link'>
              首頁
            </NavLink>
          </li>
          <li className='breadcrumb-item'>
            <NavLink to='/products' className='nav-link'>
              產品
            </NavLink>
          </li>
        </ol>

        {/* 左側分類單(mobile) */}
        <div className='row'>
          <div className='col-12 d-md-none mb-4 text-center'>
            <div className='d-flex justify-content-center flex-wrap'>
              <div
                className={`category-product-mobile text-primary rounded-5 m-3 p-2 ${
                  currentCategory === "全部商品" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("全部商品")}
              >
                全部商品
              </div>
              {[...new Set(productAll.map((product) => product.category))].map(
                (category, index) => (
                  <div
                    key={index}
                    className={`category-product-mobile text-primary rounded-5 m-3 py-2 px-3 ${
                      currentCategory === category ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </div>
                )
              )}
            </div>
          </div>

          {/* 左側分類單(desktop) */}
          <div className='col-md-3 mb-4 text-primary d-none d-md-block'>
            <div className='bg-light rounded-2 p-3'>
              <h5
                className={`mb-2 ${
                  currentCategory === "全部商品"
                    ? "text-secondary fw-bold"
                    : "text-primary"
                }`}
              >
                全部商品 All Products
              </h5>
              <ul className='list-unstyled'>
                <li className='mb-4'>
                  <div
                    className={`category-product text-primary ${
                      currentCategory === "全部商品" ? "active ps-2" : ""
                    }`}
                    onClick={() => handleCategoryClick("全部商品")}
                  >
                    全部商品
                  </div>
                </li>
                <h5
                  className={`mb-2 ${
                    currentCategory !== "全部商品"
                      ? "text-secondary fw-bold"
                      : "text-primary"
                  }`}
                >
                  商品分類 Category
                </h5>
                {[
                  ...new Set(productAll.map((product) => product.category)),
                ].map((category, index) => (
                  <li key={index} className='mb-2'>
                    <div
                      className={`category-product text-primary ${
                        currentCategory === category ? "active ps-2" : ""
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右側分類選單 */}
          <div className='col-md-9'>
            <div className='row'>
              {products.map((product) => (
                <div className='col-xxl-3 col-lg-4 col-6 mb-4' key={product.id}>
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
        </div>
        <nav className='d-flex justify-content-center'>
          <Pagination changePage={getProducts} pagination={pagination} />
        </nav>
      </div>
    </>
  );
}

export default Products;
