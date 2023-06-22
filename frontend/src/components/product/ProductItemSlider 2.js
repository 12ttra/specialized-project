
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export class ProductItemSlider extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  
      return (
        <Slider {...settings}>
          
          <div className="product-item-img product-avatar">
            <img src="/images/image-product/product1_1.jpeg" alt="Image 1" />
          </div>
          <div className="product-item-img">
            <img src="/images/image-product/product1_2.jpeg" alt="Image 2" />
          </div>
          <div className="product-item-img">
            <img src="/images/image-product/product1_1.jpeg" alt="Image 1" />
          </div>
      
        </Slider>
      );
    }
  }

  export default ProductItemSlider;
  