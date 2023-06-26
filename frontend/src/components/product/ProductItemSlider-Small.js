
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export class ProductItemSliderSmall extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        const { images } = this.props;
        console.log(this.props,"aaaa");
        return (
            <div className="product-item-slider-small">
                <Slider {...settings}>
                    {images.map((image, index)=>{
                        return <div className="product-item-img-small product-avatar"><img src={image.url}alt="Image 1" /> </div>
                    })}
                </Slider>
            </div>
        );
    }
}

export default ProductItemSliderSmall;
