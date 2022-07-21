import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";
import { toFormData, toFormData2 } from "utils";




export function useCRUDCandidateResume() {

    const { data: session } = useSession();

    const create = async (candidate_id, data) => {
        let res = await axiosInstance.post(`/api/candidates/resume?rel_id=${candidate_id}`, toFormData2(data), {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }


    const remove = async (id) => {
        let res = await axiosInstance.delete(`/api/candidates/resume/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res

    }


    return {
        create,
        remove
    }
}