

import { axiosInstance } from 'axios.config'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'






const fetcher = async (url, id, token) => {

    let res = await axiosInstance.get(`${url}/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    return res?.data?.data
   
}

export function useGetCompnay(id) {
    const {data: session} = useSession();
    const { data, error, mutate } = useSWR( id ? ['/api/company', id, session?.accessToken] : null, fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
