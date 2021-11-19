
import toast from 'react-hot-toast'
import * as showtimeType from '../constants/showtimeType'

const initialState = {
    isloading:false,
    showtime:[],
    errors:{},
    hethRap:[],
    cumRap:[]
}

 const showtimeReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case showtimeType.FETCH_INFO_SHOWTIMES_REQUEST:
        return { ...state,isloading:true }
    case showtimeType.FETCH_INFO_SHOWTIMES_SUCCESS:
        return { ...state,showtime:payload,isloading:false }
    case showtimeType.FETCH_INFO_SHOWTIMES_FAILED:
        return { ...state,errors:payload,isloading:false }
    case showtimeType.FETCH_HE_THONG_RAP_REQUEST:
        return { ...state }
    case showtimeType.FETCH_HE_THONG_RAP_SUCCESS:
        return { ...state,hethRap:payload }
    case showtimeType.FETCH_HE_THONG_RAP_FAILED:
        return { ...state,errors:payload }
    case showtimeType.FETCH_CUM_RAP_REQUEST:
        return { ...state }
    case showtimeType.FETCH_CUM_RAP_SUCCESS:
        return { ...state,cumRap:payload }
    case showtimeType.FETCH_CUM_RAP_FAILED:
        return { ...state,errors:payload }
    case showtimeType.POST_GREATE_SHOWTIME_REQUEST:
        return { ...state}
    case showtimeType.POST_GREATE_SHOWTIME_SUCCESS:
        toast.success("Tạo Lịch Chiếu Thành Công")
        return { ...state }
    case showtimeType.POST_GREATE_SHOWTIME_FAILED:
        toast.error("Tạo Lịch Chiếu Thất Bại")
        return { ...state,errors:payload }
    default:
        return state
    }
}
export default showtimeReducer;