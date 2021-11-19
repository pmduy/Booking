import { FaAngleDoubleLeft, FaAngleDoubleRight, FaRegPlayCircle } from 'react-icons/fa'
import { ImFire } from 'react-icons/im'
import moment from 'moment'
import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Tab, Tabs, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './MovieList.scss';
import ModalVideo from 'react-modal-video'
import { useSelector, useDispatch } from 'react-redux'
import { changePageAction, fetchAllMoviePageAction } from 'store/action/movieActions'
import Loader from 'react-loader-spinner'
import NowShowing from './Components/NowShowing';
import ComingSoon from './Components/ComingSoon';
export default function MovieList() {
    const [isOpen, setisOpen] = useState(false)
    const dispatch = useDispatch();
    const { movie, page, allpage, isLoading } = useSelector(state => state.movieReducer)
    useEffect(() => {
        dispatch(fetchAllMoviePageAction(page))
        
    }, [page])

    

    let renderMoviePage = () => (
        movie?.map(movie => (
            <Col lg="3" md="6" sm="12" style={{ height: "400px", marginBottom: '20px' }}>
                <div className="movie-item-contents gradient1">
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

                            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={movie.trailer?.split("embed/")[1]?.substring(0)} onClose={() => setisOpen(false)} />

                            <a className="hover-play"><FaRegPlayCircle className="ic-play" onClick={() => setisOpen(true)} /></a>
                        </div>
                        <div className="movie-item-content-bottom">
                            <div className="movie-name">
                                <Link to="#">{movie.tenPhim}</Link>
                            </div>
                            <div className="movie-moTa">
                                <p> Mô Tả: <span>{movie.moTa.length > 80 ? movie.moTa.substring(0, 80) : movie.moTa}</span></p>
                            </div>
                            <div className="movie-detail-button">
                                <div className="movie-detail">
                                    <Link to={`/movie-detail/${movie.maPhim}`} className="bgbtn btndetail btn-button" >Detail</Link>
                                </div>
                                <div className="movie-buy">
                                    <Link to={`/movie-detail/${movie.maPhim}`} className="bgbtn btnbuy btn-button" >{movie.dangChieu===true ? 'Mua Vé' : 'Coming Soon'}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        )))

    let changepage = (ispage) => {
        dispatch(changePageAction(ispage))
    }
 

    if (isLoading) return <Loader type="Bars" color="#ecd60f" height={80} width={80} style={{display:"flex",justifyContent:"center",height:'100px',alignItems: "center"}}/>
    return (
        <>
            <div className="container flex mt-4 mb-4">
                <Tabs defaultActiveKey="allmovie" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="allmovie" className="mb-2" title="All">
                        <Row>
                            {renderMoviePage()}
                            <div className="pagination">
                                <Button disabled={page === 1 ? true : false} onClick={() => changepage(false)} className="btn-pagination"><FaAngleDoubleLeft /></Button>
                                <h3><span className="activepage">{page}</span></h3>
                                <Button disabled={page === allpage ? true : false} onClick={() => changepage(true)} className="btn-pagination"><FaAngleDoubleRight /></Button>
                            </div>
                        </Row>
                    </Tab>
                    <Tab eventKey="dangchieu" title="Phim Đang Chiếu">
                        <NowShowing/>
                    </Tab>
                    <Tab eventKey="sapchieu" title="Phim Sắp Chiếu">
                        <ComingSoon/>
                    </Tab>

                </Tabs>
            </div>
        </>
    )
}
