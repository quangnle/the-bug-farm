import axios from "axios"
import { GAME_STATE } from "./gameState"
import { ICommonGetListParams, IListPagination } from "@/hooks/useList"

export const BASE_URL = 'https://api-bug-game.skyglab.tech'

axios.defaults.baseURL = BASE_URL

export const getToken = () => {
  try {
    const cache = JSON.parse(localStorage.getItem('token') || '{}')
 
    if (cache && typeof cache === 'object') {
      return cache
    }
  } catch (error) {
    console.log(error)
  }
  return undefined
}

export const setToken = (token) => {
  console.log('setToken', token)
  localStorage.setItem('token', JSON.stringify(token))
}

const api = {
  me: async () => axios.get("/auth/me"),
  login: async ({ username, password }) =>
    axios.post("/auth/login", { username, password }),
  register: async ({ username, password }) =>
    axios.post("/auth/register", { username, password }),
  getAllTanks: async ({ userId }) =>
    axios.get("/tanks", {
      params: { userId, sortField: "createdAt", sortOrder: "asc" },
    }),
  getTank: async (id) => axios.get(`/tanks/${id}`, {}),
  createTank: async (name) => axios.post("/tanks", { name }),
  getAllBugs: async () => axios.get("/bugs"),
  getBug: async (id) => axios.get(`/bugs/${id}`),
  getAllAppearances: async () => axios.get("/appearances/default"),
  createAppearance: async (payload) => axios.post("/appearances", payload),

  plantFlower: async (payload) => axios.post("/flowers", payload),
  removeFlower: async (id) => axios.delete(`/flowers/${id}`),

  sellBug: async (id) => axios.patch(`/bugs/${id}/sell`, { id }),
  sellBugs: async (payload) => axios.delete("/bugs/sell", { data: payload }),
  bugEatFlower: async (id, flowerId) =>
    axios.patch(`/bugs/${id}/eat-flower`, { id, flowerId }),
  bugChangeTank: async (id, payload: { tankId: string }) =>
    axios.patch(`/bugs/${id}/change-tank`, payload),

  getSales: async (params?: { sellerId?: string } & ICommonGetListParams) => {
    const { data } = await axios.get("/sales", { params })
    return data as IListPagination<ISale>
  },
  saleListing: async (payload: {
    bugId: string
    price: number
    description: string
  }) => axios.post("/sales/listing", payload),
  saleUnListting: async (
    id: string,
    payload: {
      tankId: string
    }
  ) => axios.patch(`/sales/${id}/cancel`, payload),
  buyBug: async (bugId: string, payload: { tankId: string }) =>
    axios.patch(`/sales/${bugId}/buy`, payload),
}

axios.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) {
    config.headers.authorization = `Bearer ${token.accessToken}`
  }

  return config
})

axios.interceptors.response.use(
  (response) => {
    if (
      GAME_STATE.user.value &&
      (response.request.responseURL.includes("buy") ||
        response.request.responseURL.includes("sell") ||
        response.request.responseURL.includes("flower") ||
        response.request.responseURL.includes("appearances"))
    ) {
      api.me().then(({ data }) => {
        GAME_STATE.user.value.money = data.money
      })
    }
    if (typeof window === 'undefined') {
      return response
    }
    if (response.data.accessToken) {
      setToken({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      })
    }

    return response
  },
  async (error) => {
    const status = error.response ? error.response.status : null
    if (status === 401) {
      const user = getToken()
      try {
        const response = await axios.post('/auth/token', {
          refreshToken: user.refreshToken
        })
        error.response.config.headers['Authorization'] =
          response && response.data.token
        return axios(error.response.config)
      } catch (err) {
        console.log(err)
      }
    } else if (status === 403) {
    }
    return Promise.reject(error)
  }
)

export default api