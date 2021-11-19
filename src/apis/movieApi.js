import axios from 'axios';
import {GROUP_ID, TOKEN_CYBERSOFT} from '../settings/apiConfig'
import callApi from '../utils/callApi';


const movieApi = {
    fetchAllMoviePageApi(page) {
        return callApi(`QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GROUP_ID}&soTrang=${page}&soPhanTuTrenTrang=12`);
    },
    fetchAllMovieApi() {
        return callApi(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
    },

    fetchMovieDetailApi(movieId) {
        return callApi(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
    },

    fetchBannerApi() {
        return callApi(`QuanLyPhim/LayDanhSachBanner`);
    },
    fetchMovieInfoApi(maphim) {
        return callApi(`QuanLyPhim/LayThongTinPhim?MaPhim=${maphim}`);
    },
    addMovieUpLoadImg(formdata){
        return callApi(`QuanLyPhim/ThemPhimUploadHinh`,"POST",formdata)
    },
    updateMovieApi:(formdata)=>{
        return callApi(`QuanLyPhim/CapNhatPhimUpload`,"POST",formdata,localStorage.getItem('accessToken'))
    },
    deleteMovieApi:(maphim)=>{
        return callApi(`/QuanLyPhim/XoaPhim?MaPhim=${maphim}`,"DELETE",null,localStorage.getItem('accessToken'))
    }
}

export default movieApi;