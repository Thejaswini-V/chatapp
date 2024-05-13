import React, { useEffect, useState } from 'react'
import { baseUrl,getRequest } from '../utils/services'

export const useFetchRecipientUser = (chat,user) => {
    const [recipientUser,setrecipientUser]=useState(null)
    const[error,seterror]=useState(null)
    const recipientId=chat?.members?.find((id)=>id!==user?._id);
    useEffect(()=>{
        const getUser=async()=>{
            if (!recipientId) return null
            const response=await getRequest(`${baseUrl}/users/find/${
                recipientId
            }`)
            if (response.error){
                return seterror(error)
            }
            setrecipientUser(response)
        }
        getUser()
    },[recipientId])
    return {recipientUser}
}

