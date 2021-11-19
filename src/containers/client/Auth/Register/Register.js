import React from 'react'
import './Register.scss'
import {withFormik} from 'formik'
import * as Yup from 'yup'
import {Link,Redirect,useHistory} from 'react-router-dom'

import { connect, useSelector } from 'react-redux'
import { phoneRegExp,emailRegExp,usernameRepExp,passwordRepExp } from 'settings/regexpConfig'
import { postRegisterAction } from 'store/action/authAction'
function Register(props) {
    const history = useHistory()
    const {taiKhoan,user} = useSelector(state=>state.authReducer)
    if(taiKhoan){
        history.push("/login")
    }
    if(user){
        return <Redirect to="/" />
    }
    const {
        touched,
        errors,
        handleChange,
        handleSubmit,
    } = props;
    return (
        <div className="bg">
        <div className="login-box">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input onChange={handleChange} type="text"  required name="hoTen" />
                    <label>Full Name</label>
                    {touched.hoTen && errors.hoTen && (<p className="font-italic text-danger">{errors.hoTen}</p>)}
                </div>
                <div className="user-box">
                    <input onChange={handleChange} type="text" name="taiKhoan" required />
                    <label>User Name</label>
                    {errors.taiKhoan && (<p className="font-italic text-danger">{errors.taiKhoan}</p>)}
                </div>
                <div className="user-box">
                    <input onChange={handleChange} type="password" name="matKhau" required />
                    <label>Password</label>
                    {errors.matKhau && (<p className="font-italic text-danger">{errors.matKhau}</p>)}
                </div>
                <div className="user-box">
                    <input onChange={handleChange} type="text" name="email" required />
                    <label>Email</label>
                    {errors.email && (<p className="font-italic text-danger">{errors.email}</p>)}
                </div>
                <div className="user-box">
                    <input onChange={handleChange} type="text" name="soDt" required />
                    <label>Phone Number</label>
                    {errors.soDt && (<p className="font-italic text-danger">{errors.soDt}</p>)}

                </div>
                <div className="flexbtn">
                <button className="btnAuth" type="submit" disabled={(Object.entries(errors).length) === 0 ? false : true}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </button>
                <Link className="btnAuth" to="/login">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                </Link>
                </div>
            </form>
        </div>
    </div>
    )
}
const FormRegisterFormik = withFormik({
    mapPropsToValues: () => ({
        hoTen: '',
        soDt: '',
        email: '',
        taiKhoan: '',
        matKhau: ''
    }),

    // Custom sync validation


    validationSchema: Yup.object().shape({
        hoTen: Yup.string()
            .required('Name is required')
            .min(6, 'Name > 6 characters')
            .max(32, 'Name < 32 characters'),
        soDt: Yup.string()
            .matches(phoneRegExp, 'Invalid phone number')
            .required('Phone number is required'),
        email: Yup.string()
            .required('Email is required')
            .matches(emailRegExp, 'Invalid email'),
        taiKhoan: Yup.string()
            .required('Username is required')
            .matches(usernameRepExp, 'Invalid username'),
        matKhau: Yup.string()
            .required('Password is required')
            .matches(passwordRepExp, 'Invalid password')
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(postRegisterAction(values))
    },

    displayName: 'Register',
})(Register);

export default connect()(FormRegisterFormik);