import * as authType from '../constants/authType'
import toast from 'react-hot-toast'
const initialState = {
    taiKhoan:'',
    user:localStorage.getItem('user'),
    token: localStorage.getItem('accessToken'),
    islogged:false,
    isloaduser:false,
    userpost:localStorage.getItem('userpost'),
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case authType.POST_REGISTER_REQUEST:
        return { ...state }
    case authType.POST_REGISTER_SUCCESS:
        toast.success('Đăng kí thành công')
        return { ...state,taiKhoan:payload.taiKhoan }
    case authType.POST_REGISTER_FAILED:
        toast.error('Đăng kí thất bại')
        return { ...state }
    case authType.POST_LOGIN_SUCCESS:
        toast.success('Đăng Nhập Thành Công')
        localStorage.setItem('user',JSON.stringify(payload))
        localStorage.setItem('accessToken',payload.accessToken)
        return { ...state,islogged:true,user:payload,token:payload.accessToken }
    case authType.POST_LOGIN_FAILED:
        toast.error('Đăng nhập thất bại')
        return { ...state }
    case authType.POST_USER_REQUEST:
        return {...state,isloaduser:true}
    case authType.POST_USER_SUCCESS:
        localStorage.setItem('userpost',JSON.stringify(payload))
        return { ...state,userpost:payload,isloaduser:false}
    case authType.POST_USER_FAILED:
        return { ...state,isloaduser:false}
    case authType.LOGOUT:
        localStorage.clear();
        return{...state,
            user:null,
            token:null,
            islogged:false,
            isloaduser:false,
            userpost:null,
        }
    default:
        return state
    }
}

export default authReducer;
