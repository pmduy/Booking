
import authApi from 'apis/authApi'
import * as authType from '../constants/authType'
export const postRegisterAction =(data)=>async(dispatch)=>{
    try{
        dispatch({type:authType.POST_REGISTER_REQUEST})
        const response = await authApi.postRegisterApi(data);
        dispatch({
            type:authType.POST_REGISTER_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:authType.POST_REGISTER_FAILED,
            payload:err
        })
    }
}
export const postLoginAction=(data)=>async(dispatch)=>{
    try{
        dispatch({type:authType.POST_LOGIN_REQUEST})
        const response = await authApi.postLoginApi(data);
        dispatch({
            type:authType.POST_LOGIN_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:authType.POST_LOGIN_FAILED,
            payload:err
        })
    }
}

export const postUserAction=()=>async(dispatch)=>{
    try{
        dispatch({type:authType.POST_USER_REQUEST})
        const response = await authApi.postUserApi();
        dispatch({
            type:authType.POST_USER_SUCCESS,
            payload:response.data.content
            
        })
        
    }catch(err){
        dispatch({
            type:authType.POST_USER_FAILED,
            payload:err
        })
    }
}
export const LogoutAction=()=>async(dispatch)=>{
    dispatch({
        type:authType.LOGOUT
    })
}