import { useState, useEffect, forwardRef } from "react";
import { NavLink } from "react-router-dom";

const CartDropdown = forwardRef(
  ({ cartData, showCartDropdown, handleCartClick }, ref) => {
    const [isVisible, setIsVisible] = useState(showCartDropdown);

    // CSS Display—none 沒辦法完整移除 html，所以改用判定方式執行
    useEffect(() => {
      if (showCartDropdown) {
        setIsVisible(true);
      } else {
        const timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 500); // 這邊時間要跟 CSS 動畫一致
        return () => clearTimeout(timeoutId);
      }
    }, [showCartDropdown]);

    return (
      <>
        {isVisible && (
          <>
            <div
              ref={ref}
              className={`cart-dropdown shadow rounded-2 position-absolute bg-white mt-1 ${
                showCartDropdown ? "show" : "hidden"
              }`}
            >
              {cartData?.carts?.length > 0 ? (
                <div className='p-4'>
                  <ul className='list-group'>
                    {cartData.carts.map((item, index) => (
                      <li className='d-flex mt-2' key={item.id}>
                        <img
                          className='rounded-2 me-2'
                          src={item.product.imageUrl}
                          alt={item.product.title}
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
                            <p className='mb-0'>NT$ {item.total}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className='d-flex justify-content-center pt-4'>
                    <NavLink
                      to='/cart'
                      className='btn btn-primary w-100'
                      onClick={handleCartClick}
                    >
                      查看購物車
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div>
                  <p className='text-dark text-center w-100 pt-5'>
                    購物車目前還沒有商品
                  </p>
                  <div className='d-flex justify-content-center p-4'>
                    <NavLink
                      to='/products'
                      className='btn btn-primary w-100'
                      onClick={handleCartClick}
                    >
                      繼續購物
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  }
);

export default CartDropdown;
