import { GROUP_ID } from "settings/apiConfig";
import callApi from "../utils/callApi";
const theaterApi = {
    fetchTheaterApi() {
        return callApi(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`)
    },
}

export default theaterApi;