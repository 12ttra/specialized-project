
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export class ProductItemSlider extends Component {
    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      const { images } = this.props;
      return (
          <div className="product-item-slider">
                <Slider {...settings}>
                    {images.map((image, index)=>{
                    return <div className="product-item-img product-avatar"><img src={image.url}alt="Image 1" /> </div>
                })}
                </Slider>
          </div>
      );
    }
  }

  