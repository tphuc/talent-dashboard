

import { axiosInstance } from 'axios.config'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'






const fetcher = async (url, token) => {

    let res = await axiosInstance.get(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    return res?.data?.data?.candidates
}

export function useGetCandidates() {
    const {data: session} = useSession();
    const { data, error, mutate } = useSWR(['/api/candidates/candidate', session?.accessToken], fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
