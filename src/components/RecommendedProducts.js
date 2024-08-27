import { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const RecommendedProducts = ({ products, getCart }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

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

  return (
    <div className='container mb-4'>
      <h3 className='text text-center text-primary border-bottom border-gray pb-3 mb-4'>
        猜您喜歡
      </h3>
      <div className='position-relative'>
        <button
          className={`scroll-button left fs-2 ${
            scrollPosition > 0 ? "opacity-100" : "btn-disabled"
          }`}
          onClick={scrollLeft}
        >
          <i className='bi bi-arrow-left-circle-fill'></i>
        </button>
        <div className='horizontal-scroll' ref={scrollContainerRef}>
          {products.slice(0, 8).map((product) => (
            <div className='card' key={product.id}>
              <ProductCard product={product} getCart={getCart} />
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
              : "btn-disabled"
          }`}
          onClick={scrollRight}
        >
          <i className='bi bi-arrow-right-circle-fill'></i>
        </button>
      </div>
    </div>
  );
};

export default RecommendedProducts;
