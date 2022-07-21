import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";
import { toFormData } from "utils";




export function useCRUDCommissionTypes() {

    const { data: session } = useSession();

    const create = async (data) => {
        let res = await axiosInstance.post('/api/settings/vendor-commission-type', toFormData(data), {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (id, data) => {
        let res = await axiosInstance.put(`/api/settings/vendor-commission-type`, toFormData({
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
        let res = await axiosInstance.delete(`/api/settings/vendor-commission-type/${id}`, {
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