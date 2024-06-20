type IUser = {
  _id: string
  username: string
  money: number
}

type ITank = {
  _id: string
  name: string
  userId: string
  size: number
  noBug?: number
  noFlower?: number
}

type IAppearance = {
  _id?: string
  name: string
  pattern: number[][]
  score: number
}

type IPoint = {
  x: number
  y: number
}

type IBoundary = {
  left: number
  right: number
  top: number
  bottom: number
}

type IRoute =  {
  
}

type IBug = {
  _id: string
  appearance: string
  createdAt: Moment | string
  updatedAt: Moment | string
}

type ISale = {
  _id: string
  bug: Bug
  price: number
  genes: IAppearance[]

  geneHash: string
  seller: string
  description: string
}