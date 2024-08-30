import ServicesList from "../../components/ServicesList";

function About() {
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
        <h1 className='text-white position-relative'>綻放，展現您的獨一無二</h1>
      </div>
      {/* 主要內容 */}
      <div className='container'>
        <div className='pt-4 pb-7 mx-2 mx-md-0'>
          {/* 第一組圖片和文字 */}
          <div className='row align-items-center bg-light rounded-3 p-4'>
            <div className='col-md-6'>
              <img
                src='https://images.unsplash.com/photo-1584811644165-33db3b146db5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='品牌故事圖1'
                className='img-fluid w-100 rounded-3'
                style={{ height: "280px", objectFit: "cover" }}
              />
            </div>
            <div className='col-md-6 mt-4 mt-md-0'>
              <h2 className='fw-bold text-secondary pt-2 p-md-0'>我們的故事</h2>
              <h6 className='fw-bold pt-2'>
                兩位姐妹，從小便對飾品充滿熱愛。她們希望自己心中的創意，可以為彼此和身邊的人增添一抹亮麗的色彩。她們相信，每一件飾品都不僅僅是一件配件，更是展現自我風格和故事的載體。
              </h6>
              <h6 className='fw-bold pt-2'>
                這是一個象徵著兩位姐妹情誼與創意的品牌，專注於設計和製作具有個人風格的飾品，使每一件作品都充滿獨特的魅力與質感。
              </h6>
              <h6 className='fw-bold pt-2'>
                彌絲，象徵著她們對美的追求，及每一位女性自信與優雅的展現。
              </h6>
            </div>
          </div>

          {/* 第二組文字和圖片 */}
          <div className='row align-items-center bg-light rounded-3 p-4 mt-4'>
            <div className='col-md-6 order-md-2'>
              <img
                src='https://images.unsplash.com/photo-1600721391689-2564bb8055de?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='品牌故事圖2'
                className='img-fluid w-100 rounded-3'
                style={{ height: "280px", objectFit: "cover" }}
              />
            </div>
            <div className='col-md-6 order-md-1 mt-4 mt-md-0'>
              <h2 className='fw-bold text-secondary pt-2 p-md-0'>我們的理念</h2>
              <h6 className='fw-bold pt-2'>
                彌絲秉持著「飾品不僅是點綴，更是心靈的外在表現」的理念。
                <br />
                我們相信，飾品不僅僅是一件配件，它更能夠表達個人內心的情感、生活態度以及對美的追求。
              </h6>
              <h6 className='fw-bold pt-2'>
                我們希望每一件作品都能成為您生活中不可或缺的一部分，無論是在日常生活中，還是在特別的時刻，都能帶給您自信與光彩。
              </h6>
              <h6 className='fw-bold pt-2'>
                這不僅僅是佩戴一件飾品，更是向世界展示最真實的自己。
              </h6>
            </div>
          </div>

          {/* 第三組圖片和文字 */}
          <div className='row align-items-center bg-light rounded-3 p-4 mt-4'>
            <div className='col-md-6'>
              <img
                src='https://images.unsplash.com/photo-1633555234047-192d10238f5f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='品牌故事圖3'
                className='img-fluid w-100 rounded-3'
                style={{ height: "280px", objectFit: "cover" }}
              />
            </div>
            <div className='col-md-6 mt-4 mt-md-0'>
              <h2 className='fw-bold text-secondary pt-2 p-md-0'>我們的承諾</h2>
              <p className='fw-bold'>
                我們承諾每一件飾品都經過嚴格的質量檢驗，並使用最優質的材料，確保每位顧客都能擁有一件持久且美麗的飾品。讓您的每一刻都能被彌絲點亮。
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 額外服務 */}
      <ServicesList />
    </>
  );
}

export default About;
