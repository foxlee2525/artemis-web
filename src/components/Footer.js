import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLine,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className='bg-dark py-2'>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-between text-white py-4'>
          <p className='mb-0'>© 2024 此專案僅供作品展示，非商業用途使用</p>
          <div>
            <h6>營業時間：週一至週五 11:00 am - 21:00 pm</h6>
            <h6>客服電話：(02)-213-1234</h6>
            <h6>客服信箱：artemis@gmail.com</h6>
            <ul className='d-flex list-unstyled mb-0 h4 mt-2'>
              <li>
                <a href='#' className='text-white mx-3'>
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li>
                <a href='#' className='text-white mx-3'>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href='#' className='text-white ms-3'>
                  <FontAwesomeIcon icon={faLine} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
