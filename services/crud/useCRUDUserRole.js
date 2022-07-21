import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";




export function useCRUDUserRole(){

    const {data: session} = useSession();

    const create = async (data) => {
        let res = await axiosInstance.post('/api/job_user_role', data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (id, data) => {
        let res = await axiosInstance.put(`/api/job_user_role/${id}`,  data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    
    }

    const remove = async (id) => {
        let res = await axiosInstance.delete(`/api/job_user_role/${id}`, {
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