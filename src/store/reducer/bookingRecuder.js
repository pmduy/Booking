import toast from 'react-hot-toast'
import * as bookingType from '../constants/bookingType'

const initialState = {
    DsGhe:[],
    DsGheDangDat:[],
    isLoading:false
}

const bookingReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case bookingType.FETCH_LIST_SEAT_REQUEST:
        return { ...state,isLoading:true }
    case bookingType.FETCH_LIST_SEAT_SUCCESS:   
        return { ...state,DsGhe:payload,isLoading:false }
    case bookingType.FETCH_LIST_SEAT_FAILED:
        return { ...state,isLoading:false }
    case bookingType.SELECT_TICKER:
        let dsGheUpdate = [...state.DsGheDangDat]
        let index = dsGheUpdate.findIndex(ghe=>ghe.maGhe === payload.maGhe);
        if(index!==-1){
            dsGheUpdate.splice(index,1)
        }else{
            if(dsGheUpdate.length>4){
                toast.error('Tối đa chỉ được đặt 5 vé')
                return {...state}
            }else{
                dsGheUpdate.push(payload)
            }
        }
        return{...state,DsGheDangDat:dsGheUpdate}
    case bookingType.POST_DATVE_REQUEST:
        return {...state,isLoading:true}
    case bookingType.POST_DATVE_SUCCESS:
        return {...state,isLoading:false}
    case bookingType.POST_DATVE_FAILED:
        return {...state}
        
    case bookingType.DAT_VE_HOAN_TAT:
        return {...state,DsGheDangDat:[],isLoading:false}
    default:
        return state
    }
}

export default bookingReducer;