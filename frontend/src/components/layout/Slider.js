
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../App.css';

export class Sliderr extends Component {
    render() {
      const settings = {
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        speed: 300,
        slidesToShow: 1,
       
      };
  
      return (
        <div id="slider-container">
        <Slider {...settings}>    
            <div className="item"><img src="/images/img_slider/slider1.jpeg" alt="" /></div>
            <div className="item"><img src="/images/img_slider/slider2.jpeg" alt="" /></div>
            <div className="item"><img src="/images/img_slider/slider3.jpeg" alt="" /></div>
            <div className="item"><img src="/images/img_slider/slider4.jpeg" alt="" /></div>
     
        </Slider>
        </div>
      );
    }
  }

  export default Sliderr;
  