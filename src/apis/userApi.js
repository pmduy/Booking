import { GROUP_ID } from "settings/apiConfig";
import callApi from "utils/callApi";

const userApi = {

  addUserApi(user, token) {
    return callApi("QuanLyNguoiDung/ThemNguoiDung", "POST", user, token);
  },

  getAllUserApi() {
    return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`);
  },

  deleteUserApi(taiKhoan, token) {
    return callApi(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`, "DELETE", null, token)
  },

  updateUserApi(user, token) {
    return callApi(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, "POST", user, token)
  },

  searchUserApi(ten) {
    return callApi(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${ten}`)
  },
};

export default userApi;