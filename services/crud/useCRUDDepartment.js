import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";




export function useCRUDDepartment(){

    const {data: session} = useSession();

    const create = async (data) => {
        let res = await axiosInstance.post('/api/setting-departments', data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (data) => {
        let res = await axiosInstance.put('/api/setting-departments', data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    
    }

    const remove = async (data) => {
        let res = await axiosInstance.delete('/api/setting-departments', {
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