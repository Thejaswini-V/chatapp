import { createContext,useState,useCallback, useEffect} from "react";
import { baseUrl, postRequest } from "../utils/services";
export const AuthContext= createContext()
export const AuthContextProvider=({children})=>{
    const baseUrl = "http://localhost:5000/api"
    const [user,setuser]=useState(null)
    const [registerError, setregisterError]=useState(null)
    const [isRegisterLoading, setisRegisterLoading]=useState(false)
    const [registerInfo, setregisterInfo]=useState({
        name:"",
        email:"",
        password:"",
    });
    const [loginError, setloginError]=useState(null)
    const [isLoginLoading, setisLoginLoading]=useState(false)
    const [loginInfo, setloginInfo]=useState({
        email:"",
        password:"",
    });
    
    useEffect(()=>{
        const user=localStorage.getItem("user")
        setuser(JSON.parse(user))
        
    },[]);
    const updateregisterInfo=useCallback((info)=>{
        setregisterInfo(info)

    },[])
    const updateloginInfo=useCallback((info)=>{
        setloginInfo(info)

    },[])
    

    const registerUser= useCallback(async(e)=>{
        e.preventDefault()
        setisRegisterLoading(true)
        setregisterError(null)
        const response=await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo))
        setisRegisterLoading(false)
        if(response.error){
            return setregisterError(response)
        }
        localStorage.setItem("User",JSON.stringify(response))
        setuser(response)
    },[registerInfo])
    const loginUser=useCallback(async(e)=>{
        e.preventDefault()
        setloginError(null)
        setisLoginLoading(true)
        const response=await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo))
        setisLoginLoading(false)
        if(response.error){
            return setloginError(response)
        }
        localStorage.setItem("User",JSON.stringify(response))
        setuser(response)
    },[loginInfo])
    console.log("loginInfo",loginInfo)
    const logoutUser=useCallback(()=>{
        const user=localStorage.removeItem("user")
        setuser(null)
    },[])
    
    return(
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateregisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            logoutUser,
            loginError,
            isLoginLoading,
            loginInfo,
            loginUser,
            updateloginInfo,

        }}>
            {children}
        </AuthContext.Provider>
    )
}