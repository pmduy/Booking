import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import moment from 'moment'
import './History.scss'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Loader from 'react-loader-spinner'
import _ from 'lodash'
export default function History() {
  const { user,userpost,isloaduser } = useSelector(state => state.authReducer)
  const thongTinDatVe = userpost?.thongTinDatVe;
  if(!user){
    return <Redirect to="/login"/>
  }
  let renderHistoryBooking = () => (
    
    _.orderBy(thongTinDatVe,['maVe'])?.map((infoticket) => {
    const barcode = `https://www.webarcode.com/barcode/image.php?code=123231231${infoticket.maVe}${infoticket.giaVe} &type=C128B&xres=1&height=80&width=180&font=30&output=png&style=196`
      // eslint-disable-next-line no-lone-blocks
        return <Row className="py-3 border-3" style={{borderBottom:"2px solid #ecd60f"}} key={infoticket.maVe}>
        <Col md="4" >
        <Image className="w-100" style={{height:"300px"}} src={infoticket.hinhAnh}></Image>
      </Col>
        <Col md="8">
          <h4 style={{borderBottom:"1px solid gray"}}>{infoticket.tenPhim}</h4>
          <div>
          <span>Mã vé: <span className="bold">{infoticket.maVe}</span> | </span>
          <span>Thời gian đặt: <span className="bold">{moment(infoticket.ngayDat).format('DD-MM-YYYY')}</span> </span>
          </div>
          <div>
            <span>Cụm Rạp: <span className="bold">{infoticket.danhSachGhe[0].maHeThongRap}</span> | </span>
            <span>Tên Rạp: <span className="bold">{infoticket.danhSachGhe[0].tenHeThongRap}</span> </span>
          </div>
          <div>
            <span>Rạp số: <span className="bold">{infoticket.danhSachGhe[0].tenCumRap}</span></span>
          </div>
          <div>
            <span>Ghế: <span className="bold">{infoticket.danhSachGhe.map(item=>item.tenGhe + ' ')}</span> | </span>
            <span>Giá vé: <span className="bold">{infoticket.danhSachGhe.length} x {infoticket.giaVe.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span> </span>
          </div>
          <div>
            <span>Tổng cộng: <span className="bold">{(infoticket.danhSachGhe.length * infoticket.giaVe).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span></span>
          </div>
          <div>
            <img src={barcode}></img>
          </div>
        </Col>
        </Row>
    })
  )
  if (isloaduser) return <Loader type="Bars" color="#ecd60f" height={80} width={80} style={{display:"flex",justifyContent:"center",height:'100vh',alignItems: "center"}}/>
  return (
    <div>
      {thongTinDatVe?.length === 0 ?
       (<div className="vh-100 textcenter d-flex flex-column justify-content-center align-items-center">
         <h3>Chưa Đặt Vé</h3> 
       </div>)  :
        (
<Container className="w-50 pt-5">
          <h3 className="text-center pt-3 ">Lịch Sử Đặt Vé</h3>
          { renderHistoryBooking()}
      </Container>
      )  
      }
      
    </div>
  )
}
