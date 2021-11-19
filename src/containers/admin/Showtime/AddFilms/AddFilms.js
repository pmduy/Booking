import React, { useState } from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import { Button,Modal } from 'react-bootstrap'
import { addMovieUpLoadImgAction } from 'store/action/movieActions'
import { connect } from 'react-redux'
import _ from 'lodash'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast';
function AddFilms(props) {
    const [startDate, setStartDate] = useState();
    const [danhGia, setdanhGia] = useState(1);
    const [imgsrc, setimgsrc] = useState('');
    const {
        touched,
        setErrors,
        errors,
        handleChange,
        setFieldValue,
        handleSubmit,
    } = props;

    const handleNgayKC = (date) => {
        setStartDate(date)
        const ngayKC = moment(date).format("DD-MM-YYYY");
        setFieldValue('ngayKhoiChieu', ngayKC)
    }

    const handleChangedanhGia = (e) => {
        setdanhGia(e.target.value)
        setFieldValue('danhGia', e.target.value)
    }

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        setFieldValue('hinhAnh', file)
        //Tạo đối tượng đọc file
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setimgsrc(e.target.result)
        }
    }
    return (
        <Modal show={props.addMovie} onHide={props.handleCloseAdd}>
                <Modal.Header className="bg-info" style={{ color:'white'}} closeButton>
                    <Modal.Title>Thêm Phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit}>
            <div className="form-row" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="form-group col-md-5">
                    <label htmlFor="inputEmail4">Mã Phim</label>
                    <input name="maPhim" onChange={handleChange} type="text" className="form-control" placeholder="Mã Phim" />
                    {errors.maPhim && (<div class="invalid-feedback">{errors.maPhim}</div>)}
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Tên Phim</label>
                    <input name="tenPhim" onChange={handleChange} type="text" className="form-control" placeholder="Tên Phim" />
                    {errors.tenPhim && (<div class="invalid-feedback">{errors.tenPhim}</div>)}
                </div>
            </div>
            <div className="form-row " style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="form-group col-md-7">
                    <label htmlFor="exampleFormControlFile1">Hình Ảnh</label>
                    <input type="file" accept="image/jpeg" name="hinhAnh" onChange={handleChangeFile} className="form-control-file" />
                    <br />
                    {imgsrc ? (<img style={{ height: "100px", width: "100px" }} src={imgsrc} alt=""></img>) : ''}
                    {errors.hinhAnh && (<div class="invalid-feedback">{errors.hinhAnh}</div>)}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="exampleFormControlFile1">Trạng Thái</label>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="customSwitch1" name="dangChieu" onChange={handleChange} />
                        <label className="custom-control-label" htmlFor="customSwitch1">Đang Chiếu</label>
                    </div>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="customSwitch2" name="sapChieu" onChange={handleChange} />
                        <label className="custom-control-label" htmlFor="customSwitch2">Sắp Chiếu</label>
                    </div>
                </div>
            </div>
            <div className="form-row " style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="form-group col-md-7">
                    <label htmlFor="exampleFormControlFile1">Ngày K/C</label>
                    <DatePicker className="form-control" name="ngayKhoiChieu" dateFormat="dd-MM-yyyy" isClearable selected={startDate} onChange={(date) => handleNgayKC(date)} placeholderText="Vui Lòng Chọn Ngày" />
                    {errors.ngayKhoiChieu && (<div class="invalid-feedback">{errors.ngayKhoiChieu}</div>)}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputState">Đánh Giá</label>
                    <input name="danhGia" onChange={(e) => handleChangedanhGia(e)} type="number" value={danhGia} min="1" max="10" className="form-control" />
                    {errors.danhGia && (<div class="invalid-feedback">{errors.danhGia}</div>)}
                </div>
            </div>
            <div className="form-group col-md-12 " style={{ padding: '0' }}>
                <label htmlFor="inputCity">Trailer</label>
                <input name="trailer" onChange={handleChange} type="text" className="form-control" />
                {errors.trailer && (<div class="invalid-feedback">{errors.trailer}</div>)}
            </div>

            <div className="form-group col-md-12 " style={{ padding: '0' }}>
                <label htmlFor="inputZip">Mô tả</label>
                <textarea name="moTa" onChange={handleChange} type="text" className="form-control" />
                {errors.moTa && (<div class="invalid-feedback">{errors.moTa}</div>)}
            </div>
            <div className="form-group">
                <div className="form-check">
                    <input onChange={handleChange} name="hot" className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="gridCheck">
                        PHIM HOT
                    </label>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '20px' }}>
                <Button type="submit" variant="primary"  >
                    Thêm
                </Button>
            </div>
        </form>
                </Modal.Body>
            </Modal>
        
    )
}
const FormAddMovieFormik = withFormik({
    mapPropsToValues: () => ({
        maPhim: '',
        tenPhim: '',
        trailer: '',
        moTa: '',
        maNhom: 'GP05',
        ngayKhoiChieu: '',
        sapChieu: false,
        dangChieu: false,
        hot: false,
        danhGia: 1,
        hinhAnh: {},
    }),

    // Custom sync validation


    validationSchema: Yup.object().shape({
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
    }),

    handleSubmit: (values, {props, setSubmitting }) => {
       
        let formData = new FormData();
        for (let key in values) {
            if (key !== 'hinhAnh') {
                formData.append(key, values[key])
            } else {
                if(_.isEmpty(values.hinhAnh.name) === true)
                {
                   toast.error("Bạn Chưa Thêm Hình Ảnh")
                   return;
                }
                else{
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
        }
        props.dispatch(addMovieUpLoadImgAction(formData))
        props.handleCloseAdd()
        props.setimgsrc('')
        setSubmitting(false);

    },

    displayName: 'AddMovie',
})(AddFilms);

export default connect()(FormAddMovieFormik);