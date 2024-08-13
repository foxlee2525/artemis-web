import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useOutletContext } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";

function Products() {
  const { cartData, setCartData, getCart } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <>
      <div className='container mt-md-5 mt-3 mb-7'>
        <Loading isLoading={isLoading} />
        <ol className='breadcrumb mb-4'>
          <li className='breadcrumb-item'>
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

        <div className='row'>
          {products.map((product) => (
            <div
              className='col-lg-3 col-md-4 col-sm-6 mb-4'
              key={product.id}
            >
              <ProductCard
                product={product}
                cartData={cartData}
                setCartData={setCartData}
                getCart={getCart}
              />
            </div>
          ))}
        </div>
        <nav className='d-flex justify-content-center'>
          <Pagination changePage={getProducts} pagination={pagination} />
        </nav>
      </div>
    </>
  );
}

export default Products;
