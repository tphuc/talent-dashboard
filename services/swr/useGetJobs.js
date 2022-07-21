

import { axiosInstance } from 'axios.config'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'






const fetcher = async (url, token) => {

    let res = await axiosInstance.get(url + '?&limit=100', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    return res?.data?.data?.jobs?.data
   
}

export function useGetJobs() {
    const {data: session} = useSession();
    const { data, error, mutate } = useSWR(['/api/job', session?.accessToken], fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
