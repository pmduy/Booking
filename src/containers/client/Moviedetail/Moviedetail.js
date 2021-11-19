import React, { useEffect, useState } from 'react'
import './Moviedetail.scss'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import { AiFillStar } from 'react-icons/ai'
import { FaWallet } from 'react-icons/fa'
import { MdLocalMovies } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchInfoShowtimeAction } from 'store/action/showtimesAction'
import { useHistory, Link } from 'react-router-dom'
import { Row, Col, Form } from 'react-bootstrap'
import moment from 'moment'

export default function Moviedetail() {
    const history = useHistory()
    const dispatch = useDispatch();
    const { showtime } = useSelector(state => state.showtimeReducer);
    const [CumRap, setCumRap] = useState([])
    const [LichChieu, setLichChieu] = useState([])


    const handleSelectHeThongRap = (event) => {
        const { value } = event.target;
        const ds = showtime.heThongRapChieu.filter(item => item.maHeThongRap === value)
        setCumRap(ds)
    }


    const renderCumRap = () => {
        return CumRap[0]?.cumRapChieu.map(item => {
            return (<option value={item.tenCumRap}>{item.tenCumRap}</option>)
        })
    }
    const handleSelectCumRap = (event) => {
        const { value } = event.target;
        const dsLichChieu = CumRap[0]?.cumRapChieu?.filter(item => item.tenCumRap === value)
        setLichChieu(dsLichChieu)
    }
    const renderLichChieu = () => {
        return LichChieu[0]?.lichChieuPhim.map(item => {
            // return (<option onClick={() => DatVe(item.maLichChieu)} value={item.NgayChieuGioChieu}>{item.maLichChieu}-{moment(item.NgayChieuGioChieu).format('DD-MM-YYYY, hh:mm:ss a')}</option>)
            return <Col xs={6} md={3}>
                <div className="moviedetail-ticket">
                    <Link className="tix" to={`/seat-plan/${item.maLichChieu}`}>
                        <div class="tixInner">
                            <span><strong>{item.tenRap}</strong> {moment(item.NgayChieuGioChieu).format('hh:mm a')}</span>
                        </div>
                    </Link>
                </div>
            </Col>
        })
    }



    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchInfoShowtimeAction(id))
    }, [])
    return (
        <div>
            <div className="moviedetail-bg" style={{ backgroundImage: `url(${showtime.hinhAnh})` }}>
                <CustomCard className="moviedetail-blur"
                    style={{ paddingTop: '200px', position: 'relative' }}
                    effectColor="#060f19" // required
                    color="#fff" // default color is white
                    blur={10} // default blur value is 10px
                    borderRadius={0} // default border radius value is 10px
                >
                </CustomCard>
            </div>
            <div style={{ backgroundColor: '#060f19', maxHeight:"auto",borderBottom:"1px solid white"}}>
                <div className="container">

                    <div className="row moviedetail-card">
                        
                        <div className="row">
                            <div className="col-4 ">
                                <div className="moviedetail-img">
                                    <img src={showtime.hinhAnh}></img>
                                </div>
                            </div>
                            <div className="col-12 col-sm-8">
                                <div className="moviedetail-namemovie">
                                    <h3>{showtime.tenPhim}</h3>
                                </div>
                                <div className="moviedetail-type">
                                    <button className="moviedetail-type-btn">{showtime.dangChieu===true ? 'NOWSHOWING': 'COMINGSOON'}</button>
                                    {showtime.hot===true ? <button className="moviedetail-type-btn">HOT</button> : ''}
                                    <button className="moviedetail-type-btn">{showtime.maNhom}</button>
                                </div>
                                <div className="moviedetail-mota">
                                    <p>{showtime.moTa?.length > 250 ? showtime.moTa?.substring(0, 250) + ' ...' : showtime.moTa}</p>
                                </div>
                                <div className="moviedetail-rating">
                                    <div className="moviedetail-rating-flex">
                                        <AiFillStar className="moviedetail-rating-star" /><span className="moviedetail-rating-ibm">{showtime.danhGia}</span><span>IBM Rating</span>
                                    </div>
                                </div>
                                <div className="moviedetail-btn">
                                    {showtime.dangChieu===true ? <button className="moviedetail-btn-buy"> <FaWallet style={{ marginBottom: '4px', marginRight: '4px' }} /> Mua vé</button> : <button className="moviedetail-btn-buy"> <FaWallet style={{ marginBottom: '4px', marginRight: '4px' }} disabled /> ComingSoon</button> }
                                    <button className="moviedetail-btn-trailer"> <MdLocalMovies style={{ marginBottom: '4px', marginRight: '4px' }} />Trailer</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{paddingTop:"300px", marginBottom:"30px"}}>
                            <h3 className="text-white border-bottom">ShowTimes - Mua Vé</h3>
                            <div>
                                <Form>
                                    <Row>
                                        <Col sm={6}>
                                            <Form.Select onChange={handleSelectHeThongRap} >
                                                <option selected disabled>Your Choose</option>
                                                {showtime.heThongRapChieu?.map(rap => {
                                                    return <option value={rap.maHeThongRap}>{rap.maHeThongRap}</option>
                                                })}

                                            </Form.Select>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Select onChange={handleSelectCumRap} >
                                                <option selected disabled >Your Choose</option>
                                                {renderCumRap()}
                                            </Form.Select>
                                        </Col>
                                        <Col sm={12}>
                                            <h3 className="moviedetail-h3">Ticket List Please Choose Ticket</h3>
                                            <Row>
                                                {renderLichChieu()}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
