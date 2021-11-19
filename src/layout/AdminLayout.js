import withLayout from 'hoc/withLayout'
import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import Sidebar from "react-sidebar"
import { Redirect } from 'react-router'
import Navbar from 'containers/admin/Sidebar'
import {AiOutlineMenuUnfold} from 'react-icons/ai'
import {Link,useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {LogoutAction} from '../store/action/authAction'
 function AdminLayout(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {user} = useSelector(state => state.authReducer)
    const userr = JSON.parse(user)
    
    const onLogout = (e) =>{
      e.preventDefault();
      dispatch(LogoutAction())
      history.push("/")
    }
    const [opensidebar, setopensidebar] = useState(false)
    const handleSetSideBar = () => setopensidebar(!opensidebar)
    return userr.maLoaiNguoiDung === 'QuanTri' ? (
        <>
        <Sidebar styles={{backgroundColor:'#001529 !important'}}
        sidebar={<Navbar setopensidebar={setopensidebar} />}
        docked={opensidebar}
        >
          <nav class="navbar navbar-expand-lg" style={{backgroundColor:'#001529'}}>
  <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <a className="nav-link" onClick={handleSetSideBar}><AiOutlineMenuUnfold style={{color:'rgba(255, 255, 255, 0.65)',fontSize:'25px',cursor:'pointer'}}/> </a>
    </li>
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" style={{color:'rgba(255, 255, 255, 0.65)'}}  aria-expanded="false">
        {userr.hoTen}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link className="dropdown-item" style={{color:'rgba(255, 255, 255, 0.65)'}} to="/">Trang Chủ</Link>
        <Link className="dropdown-item" style={{color:'rgba(255, 255, 255, 0.65)'}} onClick={onLogout}>Đăng Xuất</Link>
      </div>
    </li>
  </ul>

          </nav>
        {props.children}
      </Sidebar>
        </>
    )
    : (<Redirect to="/"/>)
}

export default withLayout(AdminLayout)