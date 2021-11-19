export const getEle = (id) => {
    return document.getElementById(id);
  };
  
  const Validator = {
    kiemTraRong: (value, spanId, mess) => {
      if (value === "") {
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
      }
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    },
  
    kiemTraNhom: (select, spanId, mess) => {
      if (getEle(select).selectedIndex === 0) {
        getEle(spanId).style.display = "block";
        getEle(spanId).textContent = mess;
        return false;
      }
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    },
  
    kiemTraDoDaiKyTu: (value, spanId, mess, min, max) => {
      if (value.length < min || value.length > max) {
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
      }
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    },
  
    kiemTraChuoi: (value, spanId, mess) => {
      var pattern = new RegExp(
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
      );
      if (!pattern.test(value)) {
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
      }
      getEle(spanId).style.display = "none";
      getEle(spanId).style.innerHTML = "";
      return true;
    },
  
    kiemTraEmail: (value, spanId, mess) => {
      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!pattern.test(value)) {
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = mess;
        return false;
      }
      getEle(spanId).style.display = "none";
      getEle(spanId).style.innerHTML = "";
      return true;
    },
  };
  
  export const validateInput = (taiKhoan, matKhau, email, soDt, hoTen) => {
    var isValid = true;
  
    isValid &=
      Validator.kiemTraRong(
        taiKhoan,
        "tbTaiKhoan",
        "Tài khoản không được để trống"
      ) &&
      Validator.kiemTraDoDaiKyTu(
        taiKhoan,
        "tbTaiKhoan",
        "Vui lòng nhập từ 4 - 10 ký tự",
        4,
        10
      );
  
    isValid &=
      Validator.kiemTraRong(
        matKhau,
        "tbMatKhau",
        "Mật khẩu không được để trống"
      ) &&
      Validator.kiemTraDoDaiKyTu(
        matKhau,
        "tbMatKhau",
        "Vui lòng nhập từ 6 - 8 ký tự",
        6,
        8
      );
  
    isValid &=
      Validator.kiemTraRong(email, "tbEmail", "Email không được để trống") &&
      Validator.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");
  
    isValid &= Validator.kiemTraDoDaiKyTu(
      soDt,
      "tbSoDt",
      "Số điện thoại không hợp lệ",
      10,
      10
    );
  
    isValid &= Validator.kiemTraNhom("maNhom", "tbMaNhom", "Bạn chưa chọn nhóm");
    isValid &= Validator.kiemTraNhom(
      "maLoaiNguoiDung",
      "tbMaLoaiNguoiDung",
      "Bạn chưa chọn loại người dùng"
    );
  
    isValid &=
      Validator.kiemTraRong(hoTen, "tbHoTen", "Họ tên không được để trống") &&
      Validator.kiemTraChuoi(hoTen, "tbHoTen", "Họ tên không hợp lệ");
  
    return isValid;
  };