import userApi from "apis/userApi";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEle, validateInput } from "./models/Validator";
import { handleOnClose } from "./models/Clear";
import "./User.scss";
import {
  actFetchUserAction,
  actSearchUserAction,
} from "store/action/userAction";
import Loader from "react-loader-spinner";
import { addClick, viewClick } from "./models/Utils";
import { template } from "./models/Temp";

export default function User() {
  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchUserAction());
  }, []);

  const token = useSelector((state) => state.authReducer.token);

  const { loading, nguoiDung } = useSelector((state) => state.userReducer);

  const { isLoading, nguoi } = useSelector((state) => state.searchReducer);

  const handleOnChage = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    var taiKhoan = getEle("taiKhoan").value;
    var matKhau = getEle("matKhau").value;
    var email = getEle("email").value;
    var soDt = getEle("soDt").value;
    var hoTen = getEle("hoTen").value;

    if (!validateInput(taiKhoan, matKhau, email, soDt, hoTen)) return;
    else {
      userApi
        .addUserApi(user, token)
        .then((response) => {
          dispatch(actFetchUserAction());
        })
        .catch((error) => {
          if (error.response.data.content == "Email đã tồn tại!") {
            getEle("tbEmail").innerHTML = "Email đã tồn tại!";
            getEle("tbEmail").style.display = "block";
          } else if (error.response.data.content == "Tài khoản đã tồn tại!") {
            getEle("tbTaiKhoan").innerHTML = "Tài khoản đã tồn tại!";
            getEle("tbTaiKhoan").style.display = "block";
          }
        });
    }
  };

  const handleOnDelete = (taiKhoan) => {
    userApi
      .deleteUserApi(taiKhoan, token)
      .then((res) => {
        dispatch(actFetchUserAction());
        dispatch(actSearchUserAction())
      })
      .catch((err) => {
        alert(err.response.data.content);
      });
  };

  const handleOnUpdate = (e) => {
    e.preventDefault();

    let taiKhoan = getEle("taiKhoan").value;
    let matKhau = getEle("matKhau").value;
    let email = getEle("email").value;
    let soDt = getEle("soDt").value;
    let maNhom = getEle("maNhom").value;
    let maLoaiNguoiDung = getEle("maLoaiNguoiDung").value;
    let hoTen = getEle("hoTen").value;

    if (!validateInput("1111", matKhau, email, soDt, hoTen)) return;
    else {
      let temp = new template(
        taiKhoan,
        matKhau,
        email,
        soDt,
        maNhom,
        maLoaiNguoiDung,
        hoTen
      );
      userApi
        .updateUserApi(temp, token)
        .then((res) => {
          dispatch(actFetchUserAction());
        })
        .catch((err) => {
          if (err.response.data.content == "Email đã tồn tại!") {
            getEle("tbEmail").innerHTML = "Email đã tồn tại!";
            getEle("tbEmail").style.display = "block";
          }
        });
    }
  };

  const handleOnSearch = (e) => {
    e.preventDefault();

    let s = getEle("searchName").value;
    if (s == "") {
      alert("Mời nhập tên!");
    }
    dispatch(actSearchUserAction(s));
  };

  const renderSearch = (u) => {
    return u.map((user) => {
      return (
        <tr>
          <td>{user.taiKhoan}</td>
          <td>{user.hoTen}</td>
          <td>{user.email}</td>
          <td>{user.soDt}</td>
          <td>{user.matKhau}</td>
          <td>{user.maLoaiNguoiDung}</td>
          <td>
            <button
              type="button"
              class="btn btn-success mr-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => viewClick(user)}
            >
              Xem
            </button>
            <button
              class="btn btn-danger"
              onClick={() => handleOnDelete(user.taiKhoan)}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container user bg-white">
      <div className="row mb-3 mt-3">
        <h3 className="text-left text-primary font-weight-bold">
          Tìm kiếm người dùng
        </h3>
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tên người dùng"
              id="searchName"
            />
            <div className="input-group-prepend">
              <button
                className="input-group-text"
                id="btnTimKH"
                onClick={handleOnSearch}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-bordered table-hover myTable">
        <tbody>
          {isLoading ? (
            <Loader type="Bars" color="#00BFFF" height={80} width={80} />
          ) : (
            nguoi && renderSearch(nguoi)
          )}
        </tbody>
      </table>
      <div className="card-header myCardHeader">
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-left text-primary font-weight-bold">
              Danh sách người dùng
            </h3>
          </div>
          <div className="col-md-6 text-right">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={addClick}
            >
              Thêm người dùng
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        <table className="table table-bordered table-hover myTable">
          <thead className="text-primary">
            <tr>
              <th>Tài khoản</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Mật khẩu</th>
              <th>Loại người dùng</th>
              <th>
                <em className="fa fa-cog" />
              </th>
            </tr>
          </thead>
          <tbody id="tableDanhSach">
            {loading ? (
              <Loader type="Bars" color="#00BFFF" height={80} width={80} />
            ) : (
              nguoiDung &&
              nguoiDung.map((user) => {
                return (
                  <tr>
                    <td>{user.taiKhoan}</td>
                    <td>{user.hoTen}</td>
                    <td>{user.email}</td>
                    <td>{user.soDt}</td>
                    <td>{user.matKhau}</td>
                    <td>{user.maLoaiNguoiDung}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-success mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => viewClick(user)}
                      >
                        Xem
                      </button>
                      <button
                        class="btn btn-danger"
                        onClick={() => handleOnDelete(user.taiKhoan)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thêm người dùng
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form role="form">
                <div className="form-group">
                  <div className="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      placeholder="Tài khoản"
                      onChange={handleOnChage}
                      id="taiKhoan"
                    />
                  </div>
                  <span class="sp-thongbao" id="tbTaiKhoan"></span>
                </div>
                <div className="form-group mt-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      name="matkhau"
                      placeholder="Mật khẩu"
                      className="form-control"
                      onChange={handleOnChage}
                      id="matKhau"
                    />
                  </div>
                  <span class="sp-thongbao" id="tbMatKhau"></span>
                </div>
                <div className="form-group mt-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-envelope" />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={handleOnChage}
                      id="email"
                    />
                  </div>
                  <span class="sp-thongbao" id="tbEmail"></span>
                </div>
                <div className="form-group mt-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fa fa-phone"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="soDt"
                      placeholder="Số điện thoại"
                      className="form-control"
                      onChange={handleOnChage}
                      id="soDt"
                    />
                  </div>
                  <span class="sp-thongbao" id="tbSoDt"></span>
                </div>
                <div className="form-group mt-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fa fa-bullseye"></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      name="maNhom"
                      id="maNhom"
                      onChange={handleOnChage}
                    >
                      <option>Chọn nhóm</option>
                      <option>GP01</option>
                      <option>GP02</option>
                      <option>GP03</option>
                      <option>GP04</option>
                      <option>GP05</option>
                      <option>GP06</option>
                      <option>GP07</option>
                      <option>GP08</option>
                      <option>GP09</option>
                    </select>
                  </div>
                  <span class="sp-thongbao" id="tbMaNhom"></span>
                </div>
                <div className="form-group mt-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fa fa-bars"></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      name="maLoaiNguoiDung"
                      id="maLoaiNguoiDung"
                      onChange={handleOnChage}
                    >
                      <option>Chọn loại người dùng</option>
                      <option>QuanTri</option>
                      <option>KhachHang</option>
                    </select>
                  </div>
                  <span class="sp-thongbao" id="tbMaLoaiNguoiDung"></span>
                </div>
                <div className="form-group mt-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-address-book" />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="hoTen"
                      placeholder="Họ tên"
                      className="form-control"
                      onChange={handleOnChage}
                      id="hoTen"
                    />
                  </div>
                  <span class="sp-thongbao" id="tbHoTen"></span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                id="them"
                className="btn btn-success"
                onClick={handleOnSubmit}
              >
                Thêm
              </button>
              <button
                type="submit"
                id="capNhap"
                className="btn btn-success"
                onClick={handleOnUpdate}
              >
                Cập nhập
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleOnClose}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}