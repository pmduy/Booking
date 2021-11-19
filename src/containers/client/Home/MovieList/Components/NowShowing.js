import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Slider from "react-slick";
import { FaRegPlayCircle} from 'react-icons/fa'
import { ImFire} from 'react-icons/im'
import moment from 'moment';
import { fetchAllMovieAction } from 'store/action/movieActions';
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function NowShowing() {
    const dispatch = useDispatch()
    const {movieAll} = useSelector(state => state.movieReducer)
    useEffect(() => {
        dispatch(fetchAllMovieAction())
    }, [])
    const nowshowing = movieAll?.filter(item=>item.dangChieu===true)
    let renderNowShowing = () => (
        nowshowing?.map(movie => (
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

                            {/* <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={movie.trailer?.split("embed/")[1]?.substring(0)} onClose={() => setisOpen(false)} /> */}

                            <a className="hover-play"><FaRegPlayCircle className="ic-play" /*onClick={() => setisOpen(true)}*/ /></a>
                        </div>
                        <div className="movie-item-content-bottom">
                            {/* <div className="movie-name">
                                <Link to="#">{movie.tenPhim}</Link>
                            </div>
                            <div className="movie-moTa">
                                <p>Mô Tả: <span>{movie.moTa.length > 80 ? movie.moTa.substring(0, 80) : movie.moTa}</span></p>
                            </div> */}
                            <div className="movie-detail-button">
                                <div className="movie-detail">
                                    <Link to={`/movie-detail/${movie.maPhim}`} className="bgbtn btndetail btn-button" >Detail</Link>
                                </div>
                                <div className="movie-buy">
                                    <Link to={`/movie-detail/${movie.maPhim}`} className="bgbtn btnbuy btn-button" >Mua vé</Link>
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
        speed: 1000,
        autoplay:true,
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
        <h3 >Phim Đang Chiếu</h3>
            <Slider className="ShowCome" {...settings}>
            {renderNowShowing()}
            </Slider>
            </div>
    )
}
