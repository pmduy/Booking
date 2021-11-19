import React, { useState } from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import { Button, Modal } from 'react-bootstrap'
import { updateMovieAction } from 'store/action/movieActions'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'


const validationSchema =Yup.object().shape({
    maPhim: Yup.number()
        .required('Mã Phim Không Được Trống'),
    tenPhim: Yup.string()
        .required('Tên Phim Không Được Trống'),
    trailer: Yup.string()
        .required('Trailer Không Được Trống')
        .matches(/www.youtube.com\/embed\/[A-z0-9]+/, "URL Không Đúng Định Dạng"),
    sapChieu: Yup.boolean()
        .required("Không "),
    moTa: Yup.string()
        .required('Mô Tả Không Được Trống'),
    ngayKhoiChieu: Yup.string()
        .required('Ngày Khởi Chiếu Không Được Trống'),
    danhGia: Yup.number()
        .min(1, 'Trong khoảng 1 - 10')
        .max(10, 'Trong khoảng 1 - 10')
        .required('Đánh Giá Không Được Trống'),
    
});


export const  UpdateFilm = (props) => {
    const dispatch = useDispatch()
    const { movieInfo } = useSelector(state => state.movieReducer)
    const [startDate, setStartDate] = useState();
    const [danhGia, setdanhGia] = useState(1);
    const [imgsrc, setimgsrc] = useState('');
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            maPhim: movieInfo?.maPhim,
            tenPhim: movieInfo?.tenPhim,
            trailer: movieInfo?.trailer,
            moTa: movieInfo.moTa,
            maNhom: 'GP05',
            ngayKhoiChieu: movieInfo?.ngayKhoiChieu,
            sapChieu: movieInfo?.sapChieu,
            dangChieu: movieInfo?.dangChieu,
            hot: movieInfo?.hot,
            danhGia: movieInfo?.danhGia,
            hinhAnh: null,
        },
        validationSchema,
        onSubmit: async(values) =>{
            values.ngayKhoiChieu = await moment(values.ngayKhoiChieu).format('DD-MM-YYYY')
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if(values.hinhAnh !== null){
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(updateMovieAction(formData))
            props.handleCloseUpdate()
        },
        

    })
    const handleNgayKC = (date) => {
        formik.setFieldValue('ngayKhoiChieu', date)
    }

    const handleChangedanhGia = (e) => {
        setdanhGia(e.target.value)
        formik.setFieldValue('danhGia', e.target.value)
    }

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        formik.setFieldValue('hinhAnh', file)
        //Tạo đối tượng đọc file
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setimgsrc(e.target.result)
        }
    }
    return (
        <Modal show={props.updateMovie} onHide={props.handleCloseUpdate}>
            <Modal.Header className="bg-info" style={{  color: 'white' }} closeButton>
                <Modal.Title>Cập Nhật Phim</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-row" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group col-md-5">
                            <label htmlFor="inputEmail4">Mã Phim</label>
                            <input name="maPhim" onChange={formik.handleChange} value={formik.values.maPhim} type="text" className="form-control" placeholder="Mã Phim" />
                            {formik.errors.maPhim && (<div class="invalid-feedback">{formik.errors.maPhim}</div>)}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Tên Phim</label>
                            <input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} type="text" className="form-control" placeholder="Tên Phim" />
                            {formik.errors.tenPhim && (<div class="invalid-feedback">{formik.errors.tenPhim}</div>)}
                        </div>
                    </div>
                    <div className="form-row " style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group col-md-7">
                            <label htmlFor="exampleFormControlFile1">Hình Ảnh</label>
                            <input type="file" accept="image/jpeg" name="hinhAnh" onChange={handleChangeFile} className="form-control-file" />
                            <br />
                         <img style={{ height: "100px", width: "100px" }} src={imgsrc === "" ? movieInfo.hinhAnh:imgsrc} alt=""></img>
                            {formik.errors.hinhAnh && (<div class="invalid-feedback">{formik.errors.hinhAnh}</div>)}
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleFormControlFile1">Trạng Thái</label>
                            <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="customSwitch1" checked={formik.values.dangChieu} name="dangChieu" onChange={formik.handleChange} />
                                <label className="custom-control-label" htmlFor="customSwitch1">Đang Chiếu</label>
                            </div>
                            <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="customSwitch2" checked={formik.values.sapChieu} name="sapChieu" onChange={formik.handleChange} />
                                <label className="custom-control-label" htmlFor="customSwitch2">Sắp Chiếu</label>
                            </div>
                        </div>
                    </div>

                    
                    {/* Ngày khởi chiếu */}
                    <div className="form-row " style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group col-md-7">
                            <label htmlFor="exampleFormControlFile1">Ngày K/C</label>
                            <DatePicker className="form-control" name="ngayKhoiChieu" value={moment(formik.values.ngayKhoiChieu).format('DD-MM-YYYY')} dateFormat="dd-MM-yyyy" isClearable selected={startDate} onChange={(date) => handleNgayKC(date)} placeholderText="Vui Lòng Chọn Ngày" />
                            {formik.errors.ngayKhoiChieu && (<div class="invalid-feedback">{formik.errors.ngayKhoiChieu}</div>)}
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">Đánh Giá</label>
                            <input name="danhGia" onChange={(e) => handleChangedanhGia(e)} type="number" value={formik.values.danhGia} min="1" max="10" className="form-control" />
                            {formik.errors.danhGia && (<div class="invalid-feedback">{formik.errors.danhGia}</div>)}
                        </div>
                    </div>
                    <div className="form-group col-md-12 " style={{ padding: '0' }}>
                        <label htmlFor="inputCity">Trailer</label>
                        <input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} type="text" className="form-control" />
                        {formik.errors.trailer && (<div class="invalid-feedback">{formik.errors.trailer}</div>)}
                    </div>

                    <div className="form-group col-md-12 " style={{ padding: '0' }}>
                        <label htmlFor="inputZip">Mô tả</label>
                        <textarea name="moTa" onChange={formik.handleChange} type="text" value={formik.values.moTa} className="form-control" />
                        {formik.errors.moTa && (<div class="invalid-feedback">{formik.errors.moTa}</div>)}
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input onChange={formik.handleChange} name="hot" checked={formik.values.hot} className="form-check-input" type="checkbox" />
                            <label className="form-check-label" htmlFor="gridCheck">
                                PHIM HOT
                            </label>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '20px' }}>
                        <Button type="submit" variant="primary"  >
                            Cập Nhật
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>

    )
}

