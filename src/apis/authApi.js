import callApi from "utils/callApi"

const authApi = {
    postRegisterApi:(data)=>{
        return callApi(`QuanLyNguoiDung/DangKy`,'POST',data)
    },
    postLoginApi:(data)=>{
        return callApi(`QuanLyNguoiDung/DangNhap`,'POST',data)
    },
    postUserApi:()=>{
        return callApi(`QuanLyNguoiDung/ThongTinTaiKhoan`,"POST",null,localStorage.getItem('accessToken'))
    },
}

export default authApi;