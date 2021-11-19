import React,{useEffect,useState} from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchInfoShowtimeAction } from 'store/action/showtimesAction'
import moment from 'moment'
import './showtime.scss'
import AddShowtime from './AddShowTime/AddShowtime'
export default function Showtime(props) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {showtime} = useSelector(state => state.showtimeReducer)
    const [lichchieu, setlichchieu] = useState(false)
    const handleShowLichChieu = ()=> setlichchieu(true)
    const handleCloseLichChieu = ()=> setlichchieu(false)
    useEffect(() => {
        dispatch(fetchInfoShowtimeAction(id))
    }, [showtime])
    return (
        <div className="site-admin bg-light">
            <div className="admin-btnAdd">
                <button onClick={handleShowLichChieu}  className="btnAddMovie bg-info">Thêm Lịch Chiếu</button>
            </div>
            <div className="showtime-info bg-info">DANH SÁCH LỊCH CHIẾU CỦA MÃ PHIM {id} </div>
            <div className="admin-dsShowtime">
                <Table responsive="xs" bordered hover size="lg">
                    <thead>
                        <tr  className="bg-info"style={{ textAlign: 'center', color: "#fff" }}>
                            <th>Mã Lịch Chiếu</th>
                            <th>Ngày Giờ Chiếu</th>
                            <th>Giá Vé</th>
                            <th>Tên Phim</th>
                            <th>Hình Ảnh</th>
                            <th>Logo</th>
                            <th>Tên Hệ Thống Rạp</th>
                            <th>Tên Rạp</th>
                        </tr>
                    </thead>
                    <tbody>
                    {showtime.heThongRapChieu?.map((htRap)=>(
                        htRap?.cumRapChieu.map((cumRapChieu)=>{
                             return cumRapChieu?.lichChieuPhim.map((lichchieu,index)=>{
                                return (
                                    <tr style={{ textAlign: 'center' }} key={index}>
                                        <td>{lichchieu.maLichChieu}</td>
                                        <td>{moment(lichchieu.ngayChieuGioChieu).format('DD-MM-YYYY, hh:mm')}</td>
                                        <td>{lichchieu.giaVe}</td>
                                        <td>{showtime.tenPhim}</td>
                                        <td><img src={showtime.hinhAnh} style={{height:'60px',width:"60px",borderRadius:"10px"}}/></td>
                                        <td><img src={htRap.logo} style={{height:'60px',width:"60px",borderRadius:"10px"}}/></td>
                                        <td>{htRap.tenHeThongRap}</td>
                                        <td>{lichchieu.tenRap}</td>
                                    </tr>
                                )
                            })
                        })
                    ))}
                        
                    </tbody>
                    
                </Table>
                <AddShowtime id={id} lichchieu={lichchieu} handleCloseLichChieu={handleCloseLichChieu}/>
            </div>
        </div>
    )
}
