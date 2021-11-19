let a = ["taiKhoan", "matKhau", "email", "soDt", "hoTen","maNhom","maLoaiNguoiDung"];
let b = ["tbTaiKhoan","tbMatKhau","tbEmail","tbSoDt","tbMaNhom","tbMaLoaiNguoiDung","tbHoTen"]

export const handleOnClose = () => {
  for (let ele of a) {
    let temp = document.getElementById(ele);
    if (ele === "maNhom" || ele === "maLoaiNguoiDung") {
      temp.selectedIndex = 0;
    } else temp.value = "";
  }

  for (let ele of b) {
    let temp = document.getElementById(ele);
    temp.style.display = "none";
    temp.innerHTML = "";
  }
};