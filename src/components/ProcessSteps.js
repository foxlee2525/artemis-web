import { useLocation } from "react-router-dom";

function ProcessSteps() {
  const location = useLocation();

  // 用當前路由判斷當前步驟
  const getCurrentStep = () => {
    if (location.pathname.includes("/cart/checkout-confirm")) {
      return 4;
    } else if (location.pathname.includes("/cart/checkout-success")) {
      return 5;
    } else if (location.pathname.includes("/cart/checkout")) {
      return 3;
    } else {
      return 2; // 默認在購物車步驟
    }
  };

  const currentStep = getCurrentStep();

  const steps = [
    { label: "選購商品", step: 1 },
    { label: "確認商品", step: 2 },
    { label: "填寫資訊", step: 3 },
    { label: "確認付款", step: 4 },
    { label: "付款完成", step: 5 },
  ];

  return (
    <div className='container pt-8'>
      <ul className='d-flex justify-content-around  w-md-75 w-100 w-lg-50 mx-auto px-0'>
        {steps.map(({ label, step }) => (
          <li key={step} className='d-flex flex-column align-items-center'>
            <div
              className={`border rounded-circle px-3 py-2 ${
                currentStep >= step
                  ? "bg-primary text-white fw-bold"
                  : "border-primary text-primary"
              } ${currentStep === step ? "current-step" : ""}`}
            >
              {step}
            </div>
            <p
              className={`text-primary mt-1 ${
                currentStep >= step ? "fw-bold" : ""
              }`}
            >
              {label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProcessSteps;
