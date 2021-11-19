import React from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import './Userinfo.scss'
import { Redirect } from 'react-router'
import { Form, Row, Col, Button, Image } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
export default function Userinfo() {
    const { userpost,user,isloaduser } = useSelector(state => state.authReducer)
    const info =()=>{
        toast.success('Vui lòng IB quản trị viên')
    }
    if (!user) {
        return <Redirect to="/login" />
    }
    if (isloaduser) return <Loader type="Bars" color="#ecd60f" height={80} width={80} style={{display:"flex",justifyContent:"center",height:'100vh',alignItems: "center"}}/>
    return (
        <div className="container userinfo-bg" >
            <div className="p-4">
            <h3 className="text-center text-white">Thông Tin Tài Khoản</h3>
            <Image className="center-img rounded-circle align-items-center " src="https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png"></Image>
            <Row className="mb-3 px-5">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={userpost?.email} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control value={userpost?.soDt} />
                </Form.Group>
            </Row>
            <Row className="mb-3 px-5">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={userpost?.taiKhoan} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control value={userpost?.hoTen} />
                </Form.Group>
            </Row>
            <Button className="mx-5 btnchange" variant="primary" onClick={info} type="submit">
                Thay đổi
            </Button>
        </div>
        </div>
    )
}
