import React from 'react'
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa'
import './Footer.scss'
export default function Footer() {
    return (
        <div>
            <div className="footer">
                <div className="container ft-content ">
                    <div className="row">
                        <div className="col-6 col-sm-6 col-md-3 item">
                           <img src="https://dynamic.brandcrowd.com/preview/logodraft/fc58703e-5a78-4f88-a145-59fb21994084/image/large.png" style={{width:"200px",height:"140px"}}></img>
                        </div>
                     
                        <div className="col-6 col-sm-6 col-md-3">
                            <h3 className="text-warning">CÔNG TY CỔ PHẦN GIẢI TRÍ CINE J</h3>
                            <ul>
                                <li><a href="#">Địa chỉ: 227, Nguyễn Văn Cừ, phường 4, quận 5, Tp.HCM</a></li>
                                <li><a href="#">Email: cinej@gmail.com</a></li>
                               
                            </ul>
                        </div>
                        <div className="col-6 col-sm-6 col-md-3 ft-right item">
                            <h3>Contact</h3>
                            <ul>
                            <a className="fb-ic" href="#">
                                    <i><FaFacebook className="icc" /> </i>
                                </a>
                                <a className="ins-ic" href="#">
                                    <i><FaInstagram className="icc" /> </i>
                                </a>
                                <a className="tw-ic" href="#">
                                    <i><FaTwitter className="icc" /> </i>
                                </a>
                                <a className="tele-ic" href="#">
                                    <i><FaTelegram className="icc" /> </i>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright ">
                    <div className="ft-left">
                        <p>© 2020 All Rights Reserved.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
