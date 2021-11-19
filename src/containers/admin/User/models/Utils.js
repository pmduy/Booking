const getEle = (id) => {
    return document.getElementById(id);
};

export function addClick() {
    getEle('capNhap').style.display = 'none';
    getEle('them').style.display = 'block';

    getEle('taiKhoan').value = "";
    getEle('taiKhoan').disabled = '';
    getEle('matKhau').value = "";
    getEle('email').value = "";
    getEle('soDt').value = "";
    getEle('maNhom').selectedIndex = 0;
    getEle('maLoaiNguoiDung').selectedIndex = 0;
    getEle('hoTen').value = "";
}

export function viewClick(user) {
    getEle('capNhap').style.display = 'block';
    getEle('them').style.display = 'none';

    getEle('taiKhoan').value = user.taiKhoan;
    getEle('taiKhoan').disabled = 'true';
    getEle('matKhau').value = user.matKhau;
    getEle('email').value = user.email;
    getEle('soDt').value = user.soDt;
    getEle('maNhom').selectedIndex = 1;
    getEle('maLoaiNguoiDung').value = user.maLoaiNguoiDung;
    getEle('hoTen').value = user.hoTen;
}