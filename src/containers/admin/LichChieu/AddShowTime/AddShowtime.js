import React, { useState,useEffect, Fragment } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import moment from 'moment'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCumRapAction, fetchHeThongRapAction, postGreateShowTime} from '../../../../store/action/showtimesAction'
import { useFormik } from 'formik';

const validationSchema =Yup.object().shape({
    ngayChieuGioChieu: Yup.string()
        .required('Mã Phim Không Được Trống'),
    maRap: Yup.string()
        .required('Trailer Không Được Trống'),
    giaVe:Yup.number()
        .required('Giá Vé Không Được Trống')
        .min(70000,'70000-200000')
        .max(200000,'70000-200000'),
});

export default function AddShowtime(props) {
    const dispatch = useDispatch()
    const [date, setdate] = useState();
    const {hethRap,cumRap} = useSelector(state=>state.showtimeReducer)
    
    
    const formik = useFormik({
        initialValues:{
            maPhim:props.id,
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe:''
        },
        validationSchema,
        onSubmit:(values)=>{
            dispatch(postGreateShowTime(values))
            props.handleCloseLichChieu()
        }
    })
    let handleTime = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
      };
    const handleNgayGioChieu = (date)=>{
        setdate(date)
        const NgayGioChieu = moment(date).format('DD/MM/yyyy hh:mm:ss')
        formik.setFieldValue('ngayChieuGioChieu',NgayGioChieu)
        
    }
    useEffect(() => {
        dispatch(fetchHeThongRapAction())
    }, [])
    const handleHeThongRap= (e)=>{
        const {value} = e.target
        dispatch(fetchCumRapAction(value))
    }
    const handleCumRap = (e)=>{
        const {value} = e.target
        formik.setFieldValue("maRap",value)
    }
    return (
        <>
            <Modal show={props.lichchieu} onHide={props.handleCloseLichChieu}>
                <Modal.Header className="bg-info" style={{ color: 'white' }} closeButton>
                    <Modal.Title>Thêm Lịch Chiếu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col xs={6}>
                                <Form.Label>Hệ Thống Rạp</Form.Label>
                                <Form.Select onChange={(e)=>handleHeThongRap(e)} aria-label="Default select example">
                                    <option disabled>Chọn hệ thống rạp</option>
                                    {hethRap?.map((htRap,index)=>{
                                        return <Fragment key={index}>
                                            <option value={htRap.maHeThongRap}>{htRap.tenHeThongRap}</option>
                                            </Fragment>
                                    })}
                                </Form.Select>
                            </Col>
                            <Col xs={6}>
                                <Form.Label>Cụm Rạp</Form.Label>
                                <Form.Select name="maRap" onChange={(e)=>handleCumRap(e)} aria-label="Default select example">
                                    <option disabled>Chọn cụm rạp</option>
                                    {cumRap?.map((cumrap,index)=>{
                                        return <Fragment key={index}>
                                            <option value={cumrap.maCumRap}>{cumrap.tenCumRap}</option>
                                        </Fragment>
                                    })}
                                </Form.Select>
                                {formik.errors.maRap && (<div class="invalid-feedback">{formik.errors.maRap}</div>)}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form.Label>Ngày Chiếu Giờ Chiếu</Form.Label>
                                <DatePicker name="ngayChieuGioChieu"
                                    selected={date}
                                    dateFormat="dd/MM/yyyy, hh:mm:ss"
                                    onChange={(date) => handleNgayGioChieu(date)}
                                    showTimeSelect
                                    timeClassName={handleTime}
                                />
                                {formik.errors.ngayChieuGioChieu && (<div class="invalid-feedback">{formik.errors.ngayChieuGioChieu}</div>)}
                            </Col>
                            <Col xs={6}>
                                <Form.Label>Giá Vé</Form.Label>
                                <Form.Control name="giaVe" onChange={formik.handleChange} type="number" placeholder="Giá Vé" />
                                {formik.errors.giaVe && (<div class="invalid-feedback">{formik.errors.giaVe}</div>)}
                            </Col>
                        </Row>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '20px' }}>
                            <Button variant="secondary" onClick={props.handleCloseLichChieu}  style={{marginRight:"20px"}} >
                                Đóng
                            </Button>
                            <Button type="submit" variant="danger"  >
                                Thêm
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}
