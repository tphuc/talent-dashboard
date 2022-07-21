

import { axiosInstance } from 'axios.config'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'






const fetcher = async (url, token) => {

    let res = await axiosInstance.get(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    return res?.data?.data?.note?.data
}


export function useGetNotesByCandidate(id) {
    const {data: session} = useSession();
    const { data, error, mutate } = useSWR( id ? [`/api/notes?type=candidate&notestable_id=${id}`, session?.accessToken] : null, fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
