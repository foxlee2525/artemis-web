import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import CartDropdown from "./CartDropdown";

function Navbar({ cartData }) {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleCartClick = useCallback((e) => {
    e.stopPropagation();
    setShowCartDropdown((prevShowCartDropdown) => !prevShowCartDropdown);
  }, []);

  const handleClickOutSide = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowCartDropdown(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, [handleClickOutSide]);

  return (
    <div className='sticky-top shadow-lg bg-white'>
      <div className='container'>
        <nav className='navbar px-0 navbar-expand-lg navbar-light bg-white'>
          {/* toggle */}
          <button
            className='navbar-toggler d-lg-none'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          {/* LOGO */}
          <NavLink className='navbar-brand mx-auto' to='/'>
            <img
              src={`${process.env.PUBLIC_URL}/artemis_logo.png`}
              style={{ width: "160px", height: "auto" }}
              alt='Logo'
            />
          </NavLink>

          {/* Cart */}
          <div
            className='d-flex position-relative d-lg-none'
            style={{ paddingRight: "12px" }}
          >
            <NavLink
              className='icon-hover position-relative'
              onClick={handleCartClick}
            >
              <i className='bi bi-cart-fill fs-4'></i>
              {cartData?.carts?.length > 0 && (
                <span className='cart-qty position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                  {cartData?.carts?.length}
                </span>
              )}
            </NavLink>
            <CartDropdown
              cartData={cartData}
              showCartDropdown={showCartDropdown}
              handleCartClick={handleCartClick}
              scrollToTop={scrollToTop}
            />
          </div>

          {/* Nav-item */}
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav me-auto'>
              <li className='nav-item ps-0 ps-lg-0 d-flex justify-content-center'>
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/products" ? "active" : ""
                  }`}
                  to='/products'
                  onClick={() => scrollToTop()}
                >
                  產品列表
                </NavLink>
              </li>
              <li className='nav-item ps-0 ps-lg-0 d-flex justify-content-center'>
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to='/about'
                  onClick={() => scrollToTop()}
                >
                  關於彌絲
                </NavLink>
              </li>
              <li className='nav-item ps-0 ps-lg-0 d-flex justify-content-center'>
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/contact" ? "active" : ""
                  }`}
                  to='/contact'
                  onClick={() => scrollToTop()}
                >
                  聯絡我們
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Cart */}
          <div className='d-lg-flex position-relative d-none'>
            <NavLink
              className='icon-hover position-relative'
              onClick={handleCartClick}
            >
              <i className='bi bi-cart-fill fs-4'></i>
              {cartData?.carts?.length > 0 && (
                <span className='cart-qty position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                  {cartData?.carts?.length}
                </span>
              )}
            </NavLink>
            <CartDropdown
              cartData={cartData}
              showCartDropdown={showCartDropdown}
              handleCartClick={handleCartClick}
              scrollToTop={scrollToTop}
            />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
