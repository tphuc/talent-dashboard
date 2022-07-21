import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";




export function useCRUDCompany(){

    const {data: session} = useSession();


    const create = async (data) => {
        let res = await axiosInstance.post('/api/company', data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (id, data) => {
        let res = await axiosInstance.put(`/api/company/${id}`, data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    
    }

    const remove = async (data) => {
        let res = await axiosInstance.delete('/api/company', {
            data: data,
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    
    }


    return {
        create,
        update,
        remove
    }
}