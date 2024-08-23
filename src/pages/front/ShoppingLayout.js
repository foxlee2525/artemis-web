import { Outlet, useOutletContext } from "react-router-dom";
import ProcessSteps from "../../components/ProcessSteps";

function ShoppingLayout() {
  const { cartData, getCart, setCartData } = useOutletContext();

  return (
    <>
      {/* 購買步驟 */}
      <ProcessSteps />
      {/* Body */}
      <div>
        <Outlet context={{ getCart, cartData, setCartData }}></Outlet>
      </div>
    </>
  );
}

export default ShoppingLayout;
