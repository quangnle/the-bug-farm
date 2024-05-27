const BASE_URL = 'https://api-bug-game.skyglab.tech'

axios.defaults.baseURL = BASE_URL

const getToken = () => {
  try {
    const cache = JSON.parse(localStorage.getItem('token') || '{}')
 
    if (cache && typeof cache === 'object') {
      return cache.accessToken
    }
  } catch (error) {
    console.log(error)
  }
  return undefined
}

const setToken = (token) => {
  console.log('setToken', token)
  localStorage.setItem('token', JSON.stringify(token))
}

const api = {
  me: async () => axios.get('/auth/me'),
  login: async ({username, password}) => axios.post('/auth/login', { username, password }),
  register: async ({username, password}) => axios.post('/auth/register', { username, password }),
  getAllTanks: async () => axios.get('/tanks'),
  getTank: async (id) => axios.get(`/tanks/${id}`),
  getAllBugs: async () => axios.get('/bugs'),
  getBug: async (id) => axios.get(`/bugs/${id}`),
  getAllAppearances: async () => axios.get('/appearances'),

  sellBug: async (id) => axios.patch(`/bugs/${id}/sell`, { id }) ,
  bugEatFlower: async (id, flowerId) => axios.patch(`/bugs/${id}/eat-flower`, { id, flowerId }) ,
}

axios.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

axios.interceptors.response.use(
  (response) => {
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
      const user = getLocalStore(LOCAL_STORE_KEY.USER_INFO)
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