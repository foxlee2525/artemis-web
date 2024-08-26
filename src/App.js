import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashborad";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrder from "./pages/admin/AdminOrder";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import ShoppingLayout from "./pages/front/ShoppingLayout";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import CheckoutSuccess from "./pages/front/CheckoutSuccess";
import CheckoutConfirm from "./pages/front/CheckoutConfirm";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<FrontLayout />}>
          <Route path='' element={<Home />}></Route>
          <Route path='products' element={<Products />}></Route>
          <Route path='product/:id' element={<ProductDetail />}></Route>
          <Route path='cart' element={<ShoppingLayout />}>
            <Route path='' element={<Cart />}></Route>
            <Route path='checkout' element={<Checkout />}></Route>
            <Route
              path='checkout-confirm/:orderId'
              element={<CheckoutConfirm />}
            ></Route>
            <Route
              path='checkout-success/:orderId'
              element={<CheckoutSuccess />}
            ></Route>
          </Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin' element={<Dashboard />}>
          <Route path='products' element={<AdminProducts />}></Route>
          <Route path='coupons' element={<AdminCoupons />}></Route>
          <Route path='orders' element={<AdminOrder />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
