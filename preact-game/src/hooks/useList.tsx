import { useCallback, useEffect, useState } from 'react'

type IPagination = {
  page?: number
  perPage?: number
  total?: number
}

type PaginationProps = IPagination & {
  current?: number
  onChange?: (page: number) => void
}

export type IListPagination<T> = {
  data: Array<T>
} & IPagination

export type ICommonGetListParams = {
  page?: number
  perPage?: number
  orderBy?: 'asc' | 'desc'
  sortField?: string
  isDeleted?: boolean
  search?: string
}

type useListReturnType<T> = {
  data: Array<T>
  pagination?: PaginationProps

  refresh: () => Promise<void>
  loading: boolean
}

export default function useList<T, K extends ICommonGetListParams>(
  fetch: (params: K) => Promise<IPagination & { data: Array<T> }>,
  config?: {
    params?: K
    type?: 'reload' | 'infinite'
    lock?: boolean
  }
): useListReturnType<T> {
  const { type, params, lock = false } = config || { type: 'reload' }
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Array<T>>([])
  const [pagination, setPagination] = useState<IPagination>()

  const fetchData = useCallback(
    async (page: number, _params?: K, prevData?: Array<T>) => {
      try {
        if (loading) return
        setLoading(true)
        const { data: resData, ...resPagination } = await fetch({
          ..._params,
          page
        } as K)
        if (type === 'reload') {
          setData(resData)
        } else {
          console.log({resData})
          setData([...(prevData || []), ...resData])
        }
        if (resData.length !== 0) {
          setPagination(resPagination)
        }
      } finally {
        setLoading(false)
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetch, type]
  )

  useEffect(() => {
    !lock && !loading && fetchData(1, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, fetchData, lock])

  const onChangePage = (page: number) => {
    fetchData(page, params, type === 'infinite' ? data : undefined)
  }

  return {
    loading,
    data,
    pagination: {
      ...pagination,
      current: data?.length,
      onChange: onChangePage
    },
    refresh: async () => fetchData(pagination?.page || 1, params)
  }
}
