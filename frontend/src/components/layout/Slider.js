import React, { Component } from 'react';

class Sliderr extends Component {
    render() {
        return (

            <div id="carouselExampleFade" className="carousel slide carousel-fade mg-top" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100 he-600" src="/images/img_slider/slider1.jpeg"  alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100 he-600" src="/images/img_slider/slider2.jpeg"  alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100 he-600" src="/images/img_slider/slider3.jpeg"  alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100 he-600" src="/images/img_slider/slider4.jpeg"  alt="Four slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default Sliderr;