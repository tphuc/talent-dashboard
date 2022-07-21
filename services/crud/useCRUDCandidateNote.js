import { axiosInstance } from "axios.config";
import { useSession } from "next-auth/react";
import { toFormData, toFormData2 } from "utils";




export function useCRUDCandidateNote() {

    const { data: session } = useSession();

    const create = async (candidate_id, data) => {
        let res = await axiosInstance.post(`/api/candidates/notes`, toFormData2({
            rel_id: candidate_id,
            ...data
        }), {
            headers: {
                'Authorization': 'Bearer ' + session.accessToken
            }
        })
        return res
    }

    const update = async (id, data) => {
        let res = await axiosInstance.put(`/api/candidates/notes`, toFormData2({
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
        let res = await axiosInstance.delete(`/api/candidates/notes/${id}`, {
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