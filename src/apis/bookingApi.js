import callApi from "utils/callApi";

const bookingApi = {
    fetchAllSeatApi(malichchieu) {
        return callApi(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${malichchieu}`);
    },
    postDatVeApi:(data)=>{
        return callApi(`QuanLyDatVe/DatVe`,"POST",data,localStorage.getItem('accessToken'))
    }
    
}

export default bookingApi;