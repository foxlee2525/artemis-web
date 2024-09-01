import ServicesList from "../../components/ServicesList";

function Contact() {
  return (
    <>
      {/* 橫幅 */}
      <div
        className='banner container-fluid d-flex align-items-center justify-content-center'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608508644127-ba99d7732fee?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(80, 40, 120, 0.5)",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        ></div>
        <h1 className='text-white position-relative'>我們，隨時為您守候</h1>
      </div>
      {/* 主要內容 */}
      <div className='container'>
        <div className='pt-4 pb-7'>
          <div className='row align-items-center bg-light rounded-3 p-4 m-0'>
            <div className='col-md-6'>
              <img
                src='https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='聯絡我們圖1'
                className='img-fluid w-100 rounded-3'
                style={{ height: "600px", objectFit: "cover" }}
              />
            </div>
            <div className='col-md-6 mt-4 mt-md-0 ps-6'>
              <h2 className='fw-bold text-secondary pt-2 p-md-0'>聯絡我們</h2>
              <h6 className='fw-bold pt-2'>
                營業時間：週一至週五 11:00 am - 21:00 pm
              </h6>
              <h6 className='fw-bold pt-2'>客服電話：(02)-213-1234</h6>
              <h6 className='fw-bold pt-2'>客服信箱：artemis@gmail.com</h6>
              <h6 className='fw-bold pt-2'>
                Instagram 帳號：artemis-accessory
              </h6>
              <h6 className='fw-bold pt-2'>Line 官方帳號：artemis-accessory</h6>
            </div>
          </div>
        </div>
      </div>
      {/* 額外服務 */}
      <ServicesList />
    </>
  );
}

export default Contact;
