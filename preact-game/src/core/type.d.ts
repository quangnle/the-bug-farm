type IUser = {
  _id: string;
  username: string;
  money: number;
  status?: string;
  createdAt?: string;
};

type ITank = {
  _id: string;
  name: string;
  userId: string;
  size: number;
  noBug?: number;
  noFlower?: number;
};

type IAppearance = {
  _id?: string;
  name: string;
  pattern: Array<Array<number | string>>;
  boostScore: number;
  score: number;
};

type IQuestion = {
  _id?: string;
  description: string;
  answers: string[];
};

type IPoint = {
  x: number;
  y: number;
};

type IBoundary = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

type IRoute = {};

type IBug = {
  _id: string;
  appearance: string;
  createdAt: Moment | string;
  updatedAt: Moment | string;
};

type ISale = {
  _id: string;
  bug: Bug;
  price: number;
  buyer: IUser;
  genes: IAppearance[];
  appearance: string;
  createdAt: string;
  updatedAt: string;
  geneHash: string;
  seller: IUser;
  description: string;
  status: string;
};

type ITradeHistory = {
  _id: string;
  bug: Bug;
  price: number;
  genes: IAppearance[];
  appearance: string;
  createdAt: string;
  updatedAt: string;
  geneHash: string;
  seller: IUser;
  description: string;
  type: string;
  buyer: IUser;
};
