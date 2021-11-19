import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {AiFillDashboard} from 'react-icons/ai'
import {FaUserCircle} from 'react-icons/fa'
import {MdMovieFilter} from 'react-icons/md'
import './Sidebar.scss';


function Navbar() {
  const _handleClick = ()=>{
    var a = document.querySelectorAll(".listsidebar .sidebar-item a");
for (var i = 0, length = a.length; i < length; i++) {
a[i].onclick = function() {
var b = document.querySelector(".listsidebar .sidebar-item.active");
if (b) b.classList.remove("active");
this.parentNode.classList.add('active');
};
}
}
  return (
    <div className="sidebar">
      <Link to='/' className="logo">CINEMA J BOOKING</Link>
        <ul className="listsidebar">
          <li onClick={_handleClick} className="sidebar-item"><Link to="/admin"><AiFillDashboard style={{margin:'0 5px 3px 0'}}/> Trang Chủ</Link></li>
          <li onClick={_handleClick} className="sidebar-item"><Link to="/admin/user"><FaUserCircle style={{margin:'0 5px 3px 0'}}/> Quản Lý Người Dùng</Link></li>
          <li onClick={_handleClick} className="sidebar-item"><Link to="/admin/film"><MdMovieFilter style={{margin:'0 8px 3px 0'}}/>Quản Lý Phim</Link></li>
        </ul>
    </div>
  );
}

export default Navbar;