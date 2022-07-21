import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";
import { toFormData } from "utils";




export function useCRUDSkills(){

    const {data: session} = useSession();

    const create = async (data) => {
        let res = await axiosInstance.post('/api/settings/global-skills', toFormData(data), {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (id, data) => {
        let res = await axiosInstance.put('/api/settings/global-skills', toFormData({
            id, 
            ...data
        }), {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    
    }

    const remove = async (id) => {
        let res = await axiosInstance.delete(`/api/settings/global-skills/${id}`, {
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