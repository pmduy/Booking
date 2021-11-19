import showtimeApi from 'apis/showtimeApi'
import * as showtimeType from '../constants/showtimeType'


export const fetchInfoShowtimeAction = (maphim)=>async(dispatch)=>{
    try{
        dispatch({type:showtimeType.FETCH_INFO_SHOWTIMES_REQUEST})
        const response = await showtimeApi.fetchInfoShowtimeApi(maphim)
        dispatch({
            type:showtimeType.FETCH_INFO_SHOWTIMES_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:showtimeType.FETCH_INFO_SHOWTIMES_FAILED,
            payload:err
        })
    }
}

export const fetchHeThongRapAction = ()=>async(dispatch)=>{
    try{
        dispatch({type:showtimeType.FETCH_HE_THONG_RAP_REQUEST})
        const response = await showtimeApi.fetchHeThongRapApi()
        dispatch({
            type:showtimeType.FETCH_HE_THONG_RAP_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:showtimeType.FETCH_HE_THONG_RAP_FAILED,
            payload:err
        })
    }
}

export const fetchCumRapAction = (mahtrap)=>async(dispatch)=>{
    try{
        dispatch({type:showtimeType.FETCH_CUM_RAP_REQUEST})
        const response = await showtimeApi.fetchCumRapApi(mahtrap)
        dispatch({
            type:showtimeType.FETCH_CUM_RAP_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:showtimeType.FETCH_CUM_RAP_FAILED,
            payload:err
        })
    }
}
export const postGreateShowTime = (data)=>async(dispatch)=>{
    try{
        dispatch({type:showtimeType.POST_GREATE_SHOWTIME_REQUEST})
        const response = await showtimeApi.postTaoShowTime(data)
        dispatch({
            type:showtimeType.POST_GREATE_SHOWTIME_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:showtimeType.POST_GREATE_SHOWTIME_FAILED,
            payload:err
        })
    }
}