import { useLocation } from "react-router-dom";

function ProcessSteps() {
  const location = useLocation();

  // 用當前路由判斷當前步驟
  const getCurrentStep = () => {
    if (location.pathname.includes("/cart/checkout")) {
      return 3;
    } else if (location.pathname.includes("/cart/success")) {
      return 5;
    } else {
      return 2; // 默認在購物車步驟
    }
  };

  const currentStep = getCurrentStep();

  return (
    <div className='container pt-8'>
      <ul className='d-flex justify-content-around w-md-75 w-100 w-lg-50 mx-auto'>
        <li
          className={`d-flex flex-column align-items-center ${
            currentStep >= 1 ? "active" : ""
          }`}
        >
          <div>1</div>
          <p>挑選產品</p>
        </li>
        <li
          className={`d-flex flex-column align-items-center ${
            currentStep >= 2 ? "active" : ""
          }`}
        >
          <div>2</div>
          <p>購物車</p>
        </li>
        <li
          className={`d-flex flex-column align-items-center ${
            currentStep >= 3 ? "active" : ""
          }`}
        >
          <div>3</div>
          <p>填寫資訊</p>
        </li>
        <li
          className={`d-flex flex-column align-items-center ${
            currentStep >= 4 ? "active" : ""
          }`}
        >
          <div>4</div>
          <p>確認付款</p>
        </li>
        <li
          className={`d-flex flex-column align-items-center ${
            currentStep >= 5 ? "active" : ""
          }`}
        >
          <div>5</div>
          <p>完成</p>
        </li>
      </ul>
    </div>
  );
}

export default ProcessSteps;
