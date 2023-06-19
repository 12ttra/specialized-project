import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import '../../Footer.css'

const Footer = () => {
  return (
    <Fragment>
<footer id="footer">
  <br/>
      <div className="footer-service">
        <div className="row">
          <div className="col col-third footer-logo">
            <img src="/images/Image/footericon.png" alt="" />
          </div>
          <div className="col col-third img-infor">
            <div className="wrapper-items-footer">
              <p>
                <img src="/images/iconheader/location.svg" alt="location" />
                ThuDuc City, VietNam
              </p>
              <p>
                <img src="/images/iconheader/phone-call.svg" alt="phone" />
                191964-202032
              </p>
              <p>
                <img src="/images/iconheader/mail.svg" alt="email" />
                sprezza-ecommerce@gmail.com
              </p>
            </div>
          </div>
          <div className="col col-third infor-service">
            <div className="wrapper-items-footer">
              <h4>ABOUT SPREZZA</h4>
              <ul>
                <li>
                  <a href="/">About Us</a>
                </li>
                <li>
                  <a href="/">Gift Card</a>
                </li>
                <li>
                  <a href="/">Size Guide</a>
                </li>
                <li>
                  <a href="/">Shipping &amp; Delivery</a>
                </li>
                <li>
                  <a href="/">Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-social-media">
        <div className="social-media-list social-media-img">
          <a href="/">
            <img src="/images/img-social-media/facebook.svg" alt="facebook" />
          </a>
          <a href="/">
            <img src="/images/img-social-media/instagram.svg" alt="instagram" />
          </a>
          <a href="/">
            <img src="/images/img-social-media/copyright.png" alt="copy-right" />
          </a>
          <a href="/">
            <img src="/images/img-social-media/tik-tok.svg" alt="tiktok"/>
            </a>
            <a href="/">
            <img src="/images/img-social-media/twitter.svg" alt="twitter" />
          </a>
        </div>
      </div>
    </footer>
    </Fragment>
  );
}

export default Footer
