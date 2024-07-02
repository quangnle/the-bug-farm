import axios from "axios";
import { GAME_STATE } from "./gameState";
import { ICommonGetListParams, IListPagination } from "@/hooks/useList";
import Bug from "./entity/bug";

export const BASE_URL = "https://api-bug-game.skyglab.tech";

axios.defaults.baseURL = BASE_URL;

let controller: AbortController;

const APIS_WILL_UPDATE_USER = [
  "patch|buy",
  "delete|sell",
  "post|flowers",
  "post|appearances",
  "post|sales/listing",
];

export const getToken = () => {
  try {
    const cache = JSON.parse(localStorage.getItem("token") || "{}");

    if (cache && typeof cache === "object") {
      return cache;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const setToken = (token) => {
  console.log("setToken", token);
  localStorage.setItem("token", JSON.stringify(token));
};

const api = {
  me: async (hasCancel = true) => {
    const { data } = await axios.get("/auth/me", {
      signal: hasCancel ? controller.signal : undefined,
    });
    return data as IUser;
  },
  login: async ({ username, password }) =>
    axios.post("/auth/login", { username, password }),
  register: async ({ username, password }) =>
    axios.post("/auth/register", { username, password }),
  getAllTanks: async ({ userId }) =>
    axios.get("/tanks", {
      params: { userId, sortField: "createdAt", sortOrder: "asc" },
    }),
  getQuestions: async () => axios.get("/questions/my-question"),
  answerQuestion: async (id: string, payload: { answer: string }) =>
    axios.patch(`/questions/${id}`, payload),
  getTank: async (id) => axios.get(`/tanks/${id}`, {}),
  createTank: async (name) => axios.post("/tanks", { name }),
  getAllBugs: async (params) => axios.get("/bugs", { params }),
  getBug: async (id) => axios.get(`/bugs/${id}`),
  getBugStorage: async (params?: ICommonGetListParams) => {
    const { data } = await axios.get("/bugs/storage", { params });
    return data as IListPagination<Bug>;
  },
  getAllAppearances: async () => axios.get("/appearances/default"),
  getUserAppearances: async () => axios.get("/appearances/default-of-user"),
  createAppearance: async (payload) => axios.post("/appearances", payload),
  updateAppearance: async (
    id: string,
    payload: { pattern: Array<Array<number | string>> }
  ) => axios.patch(`/appearances/${id}`, payload),
  getAllFlowers: async (params) => axios.get("/flowers", { params }),
  plantFlower: async (payload) => axios.post("/flowers", payload),
  removeFlower: async (id) => axios.delete(`/flowers/${id}`),

  sellBug: async (id) => axios.patch(`/bugs/${id}/sell`, { id }),
  sellBugs: async (payload) => axios.delete("/bugs/sell", { data: payload }),
  bugEatFlower: async (id, flowerId) =>
    axios.patch(`/bugs/${id}/eat-flower`, { id, flowerId }),
  bugEatPill: async (id: string) => axios.patch(`/bugs/${id}/eat-pill`),
  bugChangeTank: async (id, payload: { tankId: string }) =>
    axios.patch(`/bugs/${id}/change-tank`, payload),

  getSales: async (params?: { sellerId?: string } & ICommonGetListParams) => {
    const { data } = await axios.get("/sales", { params });
    return data as IListPagination<ISale>;
  },
  getSalesHistory: async (params?: {} & ICommonGetListParams) => {
    const { data } = await axios.get("/sales/history", { params });
    return data as IListPagination<ITradeHistory>;
  },
  saleListing: async (payload: {
    bugId: string;
    price: number;
    description: string;
  }) => axios.post("/sales/listing", payload),
  saleUnListting: async (
    id: string,
    payload: {
      tankId: string;
    }
  ) => axios.patch(`/sales/${id}/cancel`, payload),
  buyBug: async (bugId: string, payload: { tankId: string }) =>
    axios.patch(`/sales/${bugId}/buy`, payload),
};

axios.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token.accessToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (
      GAME_STATE.user.value &&
      APIS_WILL_UPDATE_USER.some((x) => {
        const [method, path] = x.split("|");

        return (
          method === response.config.method &&
          response.request.responseURL.includes(path)
        );
      })
    ) {
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();
      const data = await api.me();
      if (data) {
        GAME_STATE.user.value.money = data.money;
      }
    }
    if (typeof window === "undefined") {
      return response;
    }
    if (response.data.accessToken) {
      setToken({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    }

    return response;
  },
  async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      const user = getToken();
      try {
        const response = await axios.post("/auth/token", {
          refreshToken: user.refreshToken,
        });
        error.response.config.headers["Authorization"] =
          response && response.data.token;
        return axios(error.response.config);
      } catch (err) {
        console.log(err);
      }
    } else if (status === 403) {
    }
    return Promise.reject(error);
  }
);

export default api;
