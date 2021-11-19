import bookingApi from "apis/bookingApi";
import * as bookingType from '../constants/bookingType'
import { postUserAction } from "./authAction";
export const fetchListSeatAction=(malichchieu)=>async(dispatch)=>{
    try{
        dispatch({type:bookingType.FETCH_LIST_SEAT_REQUEST})
        const response = await bookingApi.fetchAllSeatApi(malichchieu);
        dispatch({
            type:bookingType.FETCH_LIST_SEAT_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:bookingType.FETCH_LIST_SEAT_FAILED,
            payload:err
        })
    }
}
export const postDatVeAction=(data)=>async(dispatch)=>{
    try{

        dispatch({type:bookingType.POST_DATVE_REQUEST})
        const response = await bookingApi.postDatVeApi(data);
        dispatch({
            type:bookingType.POST_DATVE_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:bookingType.POST_DATVE_FAILED,
            payload:err
        })
    }
    await dispatch(fetchListSeatAction(data.maLichChieu))
    await dispatch({type:bookingType.DAT_VE_HOAN_TAT})
    await dispatch(postUserAction())
}
export const SeletedTicket=(data)=>async(dispatch)=>{
        dispatch({
            type:bookingType.SELECT_TICKER,
            payload:data
        })
}