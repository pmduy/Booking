import React from 'react'
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import { FaRegPlayCircle} from 'react-icons/fa'
import { ImFire} from 'react-icons/im'
import moment from 'moment';
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ComingSoon() {
    const {movieAll} = useSelector(state => state.movieReducer)
    const ComingSoon = movieAll?.filter(item=>item.sapChieu===true)
    let renderComingSoon = () => (
        ComingSoon?.map(movie => (
            <Col sm={12} >
                <div className="movie-item-contents gradient1" style={{height:'355px' }}>
                    <Image src={movie.hinhAnh}></Image>
                    <div className="movie-item-content">
                        <div className="movie-item-content-top">
                            <div className="content-left">
                                <span className="movie-premiere hover-left">{moment(movie.ngayKhoiChieu).format("MMM Do YY")}</span>
                            </div>
                            {movie.hot ? (<div className="content-right">
                                <span className="movie-hot hover-right"><ImFire className="ic-hot" />HOT</span>
                            </div>) : ''}
                        </div>
                        <div className="movie-item-content-center">

                            <a className="hover-play"><FaRegPlayCircle className="ic-play" /*onClick={() => setisOpen(true)}*/ /></a>
                        </div>
                        <div className="movie-item-content-bottom">
                            
                            <div className="movie-detail-button">
                                <div className="movie-detail">
                                    <Link to={`/movie-detail/${movie.maPhim}`} className="bgbtn btndetail btn-button" >Detail</Link>
                                </div>
                                <div className="movie-buy">
                                    <Link to={`/movie-detail/${movie.maPhim}`} className="bgbtn btnbuy btn-button" >Coming Soon</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        )))

        const settings = {
            dots: true,
            infinite: true,
            autoplay:true,
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        }

    return (
        <div className="container" style={{paddingTop:"100px",paddingBottom:'50px'}}>
        <h3 >Phim Sắp Chiếu</h3>
            <Slider className="ShowCome" {...settings}>
                {renderComingSoon()}
            </Slider>
        </div>
    )
}
