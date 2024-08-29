function ServicesList() {
  return (
    <div className='container-fluid bg-primary d-flex justify-content-center pt-4'>
      <ul className='row w-100 mx-xxl-6 me-3'>
        <li className='col-12 col-md-6 col-lg-3 text-white'>
          <i className='bi bi-truck fs-2'></i>
          <h4 className='mt-2'>交貨快速</h4>
          <p>
            在商品庫存充足下，我們先諾下單三天內會出貨。如您所訂購的商品庫存不足，我們將盡快以電子郵件通知您。
          </p>
        </li>
        <li className='col-12 col-md-6 col-lg-3 text-white'>
          <i className='bi bi-shield-lock fs-2'></i>
          <h4 className='mt-2'>售後服務</h4>
          <p>為保障買家權益，所有商品皆享有30日的售後服務。</p>
        </li>
        <li className='col-12 col-md-6 col-lg-3 text-white'>
          <i className='bi bi-chat-dots fs-2'></i>
          <h4 className='mt-2'>客服服務</h4>
          <p>
            如購買過程及收到商品有任何問題，歡迎聯繫我們，我們會盡快回覆您。
          </p>
        </li>
        <li className='col-12 col-md-6 col-lg-3 text-white'>
          <i className='bi bi-gift fs-2'></i>
          <h4 className='mt-2'>包裝服務</h4>
          <p>如需額外包裝，可再下訂後通知我們，會有專人協助處理相關事宜。</p>
        </li>
      </ul>
    </div>
  );
}

export default ServicesList;
