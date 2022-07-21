import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";




export function useCRUDNote(){

    const {data: session} = useSession();

    const create = async (data) => {
        let res = await axiosInstance.post('/api/notes', data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (id, data) => {
        let res = await axiosInstance.put(`/api/notes/${id}`, data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    
    }

    const remove = async (id) => {
        let res = await axiosInstance.delete(`/api/notes/${id}`, {
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