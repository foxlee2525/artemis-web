import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";

import ProductCard from "../../components/ProductCard";

function ProductDetail({}) {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [descriptionArray, setDescriptionArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { id } = useParams();
  const { getCart } = useOutletContext();
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();

  const getProduct = async (id) => {
    const productResult = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    const productData = productResult.data.product;

    // 將 description 轉換為 array
    if (productData.description) {
      const descriptionArray = productData.description
        .split("\n")
        .map((item) => item.trim());
      setDescriptionArray(descriptionArray);
    }
    setProduct(productData);
  };

  const getProducts = async (page = 1) => {
    const productResult = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    const productData = productResult.data.products;
    // console.log(productData);
    setProducts(productData);
  };

  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQuantity,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      // console.log(res);
      dispatch(createAsyncMessage(res.data));
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  useEffect(() => {
    getProducts(1);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getFormattedContent = (content) => {
    if (!content) return "";
    const parts = content.split("-");
    return parts.length > 1 ? parts[1].trim() : parts[0].trim();
  };

  // 底部""猜你喜歡""卡片左右滑動
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
      setScrollPosition(
        scrollContainerRef.current.scrollLeft -
          scrollContainerRef.current.scrollRight
      );
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
      setScrollPosition(
        scrollContainerRef.current.scrollLeft +
          scrollContainerRef.current.scrollRight
      );
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
      return () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.removeEventListener(
            "scroll",
            handleScroll
          );
        }
      };
    }
  }, []);

  if (!product) {
    return <div>Loading...</div>; // 或者顯示其他的加載指示器
  }

  return (
    <div className='container border-bottom border-gray pt-10 mb-10'>
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
        <li className='breadcrumb-item'>
          <NavLink to='/products/earring' className='nav-link'>
            {product.category}
          </NavLink>
        </li>
        <li className='breadcrumb-item active'>{product.title}</li>
      </ol>
      <div className='row justify-content-between mb-7'>
        <div className='col-md-7'>
          <div className='my-0'>
            <img
              src={product.imageUrl}
              alt=''
              className='img-fluid w-lg-75 w-md-100 mb-4 card-img-top object-cover rounded-3'
              style={{ height: "520px" }}
            />
          </div>
        </div>
        <div className='col-md-4'>
          <p className='mb-2'>{product.category}</p>
          <h2 className='mb-4'>{product.title}</h2>
          <p className='mb-4'>
            商品材質： {descriptionArray[0]}
            <br />
            商品尺寸： {descriptionArray[1]}
            <br />
            販售形式： {descriptionArray[2]}
          </p>
          <p
            className='mb-4'
            style={{ whiteSpace: "pre-line", fontStyle: "italic" }}
          >
            {getFormattedContent(product.content)}
          </p>
          <p className='fw-bold'>NT$ {product.price}</p>
          <div className='input-group mb-3 rounded-2 border mt-3'>
            <div className='input-group-prepend'>
              <button
                className='btn btn-outline-dark rounded-2 border-0 p-3'
                type='button'
                id='button-addon1'
                onClick={() =>
                  setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                }
              >
                <i className='bi bi-dash-lg'></i>
              </button>
            </div>
            <input
              type='number'
              className='form-control rounded-2 border-0 text-center my-auto shadow-none'
              placeholder=''
              aria-label='Example text with button addon'
              aria-describedby='button-addon1'
              readOnly
              value={cartQuantity}
            />
            <div className='input-group-append rounded-2'>
              <button
                className='btn btn-outline-dark border-0 p-3'
                type='button'
                id='button-addon2'
                onClick={() => setCartQuantity((pre) => pre + 1)}
              >
                <i className='bi bi-plus-lg'></i>
              </button>
            </div>
          </div>
          <button
            type='button'
            className={
              isLoading
                ? "button_addToCart btn btn-primary w-100 rounded-2 py-3 bounceBack"
                : "button_addToCart btn btn-primary w-100 rounded-2 py-3"
            }
            onClick={addToCart}
            disabled={isLoading}
          >
            加入購物車
          </button>
        </div>
      </div>
      <div className='container pt-2'>
        <ul className='nav nav-tabs fs-5 d-flex justify-content-around border-bottom border-gray'>
          <li className='tab-nav-item'>
            <button
              className={`nav-link ${
                activeTab === "description" ? "active" : ""
              }`}
              type='button'
              onClick={() => handleTabClick("description")}
            >
              產品介紹
            </button>
          </li>
          <li className='tab-nav-item'>
            <button
              className={`nav-link ${activeTab === "specs" ? "active" : ""}`}
              type='button'
              onClick={() => handleTabClick("specs")}
            >
              產品規格
            </button>
          </li>
          <li className='tab-nav-item'>
            <button
              className={`nav-link ${activeTab === "notice" ? "active" : ""}`}
              type='button'
              onClick={() => handleTabClick("notice")}
            >
              購買須知
            </button>
          </li>
        </ul>

        <div className='tab-content pt-4'>
          <div
            className={`tab-pane fade ${
              activeTab === "description" ? "show active" : ""
            }`}
            id='tab-description'
            role='tabpanel'
            aria-labelledby='tab-description'
          >
            <p className='mb-4' style={{ whiteSpace: "pre-line" }}>
              {product.content}
            </p>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "specs" ? "show active" : ""
            }`}
            id='tab-specs'
            role='tabpanel'
            aria-labelledby='tab-specs'
          >
            <ul
              className='d-flex flex-wrap w-100 w-md-75 w-lg-50 mx-auto
            text-center border-bottom border-gray mb-4 pb-2'
            >
              <li className='w-50 fw-bold'>商品材質：</li>
              <li className='w-50'>{descriptionArray[0]}</li>
            </ul>
            <ul
              className='d-flex flex-wrap w-100 w-md-75 w-lg-50 mx-auto
            text-center border-bottom border-gray mb-4 pb-2'
            >
              <li className='w-50 fw-bold'>商品尺寸：</li>
              <li className='w-50'>{descriptionArray[1]}</li>
            </ul>
            <ul
              className='d-flex flex-wrap w-100 w-md-75 w-lg-50 mx-auto
            text-center border-bottom border-gray mb-4 pb-2'
            >
              <li className='w-50 fw-bold'>販售形式：</li>
              <li className='w-50'>{descriptionArray[2]}</li>
            </ul>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "notice" ? "show active" : ""
            }`}
            id='tab-notice'
            role='tabpanel'
            aria-labelledby='tab-notice'
          >
            <h5 className='mb-2'>
              <strong>標準快遞 - SF Express</strong>
            </h5>

            <p>
              從星期一到星期五早上 10:00 所下的訂單會在該工作天處理與出貨。
              <br />
              標準快遞時間：在處理和出貨後 2-4 個工作天
              <br />
              台北、台中、台南、桃園和高雄：2-4 個工作天
              <br />
              台灣其他地區：3-4 個工作天 標準快遞成本：50 台幣
              <br />
              免費標準運送：1,000 台幣
              <br />
              從週末和國定假日所下的訂單會在下二個工作天處理與出貨。
              <br />
              無法將商品運送到郵政信箱或陸軍 /
              海軍地址。在收到最後款項前，商品仍屬彌絲財產。
              <br />
              在最後通知的快遞日期前完成訂購，則運送的物品通常能按時送出。快遞可能會因為我們的合作夥伴發生不可預見的違規行為而延遲。
              <br />
              在這類情況下，彌絲不承擔任何責任。
              <br />
              彌絲的第一要務即為讓所有顧客滿意。您可退還訂購的商品，並在我們收到商品後最多
              7 天後撤銷銷售合約。
              <br />
              我們的退貨條款涵蓋所有商品，包含促銷或折扣商品。
            </p>
            <br />
            <h5 className='mb-2'>
              <strong>需要多長的時間來處理退貨？</strong>
            </h5>

            <p>
              在我們收到您的退貨包裹後，我們會加以登記並在處理時傳送電子郵件通知您。
              <br />
              之後的退款轉帳將依據您的金融機構的指示進行，
              <br />
              最多可能需要 3-7
              個工作天將退款，並以您下訂單所使用的相同付款方式退回。
              <br />
              退貨和退款流程所需的全部時間，最多可能需要 3-4
              週（自您包裹寄送日起算）。
              <br />
              退貨將按照原始付款方式進行處理，最多需要 3-7
              個工作日才能收到退款。
            </p>
          </div>
        </div>
      </div>
      <div className='container mt-10 mb-4'>
        <h3 className='text text-center text-primary border-bottom border-gray pb-3 mb-4'>
          猜您喜歡
        </h3>
        <div className='position-relative'>
          <button
            className={`scroll-button left fs-2 ${
              scrollPosition > 0 ? "opacity-100" : ""
            }`}
            onClick={scrollLeft}
          >
            <i className='bi bi-arrow-left-circle-fill'></i>
          </button>
          <div className='horizontal-scroll ' ref={scrollContainerRef}>
            {products.slice(0, 8).map((product) => (
              <div className='card' key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <button
            className={`scroll-button right fs-2 ${
              scrollContainerRef.current &&
              scrollPosition <
                scrollContainerRef.current.scrollWidth -
                  scrollContainerRef.current.clientWidth
                ? "opacity-100"
                : ""
            }`}
            onClick={scrollRight}
          >
            <i className='bi bi-arrow-right-circle-fill'></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
