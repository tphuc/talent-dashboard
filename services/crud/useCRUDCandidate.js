import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";
import { toFormData } from "utils";




export function useCRUDCandidate() {

    const { data: session } = useSession();

    const create = async (data) => {
        let res = await axiosInstance.post('/api/candidates/candidate', data, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (id, data) => {
        let res = await axiosInstance.put('/api/candidates/candidate', toFormData({
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
        let res = await axiosInstance.delete(`/api/candidates/candidate/${id}`, {
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