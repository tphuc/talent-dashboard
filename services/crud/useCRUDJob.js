import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";




export function useCRUDJob(){

    const {data: session} = useSession();

    const create = async (data) => {
        let res = await axiosInstance.post('/api/job', data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (data) => {
        let res = await axiosInstance.put('/api/job', data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    
    }

    const remove = async (data) => {
        let res = await axiosInstance.delete('/api/job', {
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