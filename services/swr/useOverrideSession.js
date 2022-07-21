


import useSWR from 'swr'






const fetcher = async (url) => {
    let res = await fetch(url)
    return res
}

export function useOverrideSession() {
    const { data, mutate, error } = useSWR('/api/get-session', fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,

    })
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
