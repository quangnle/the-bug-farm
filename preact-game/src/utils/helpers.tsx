import { AxiosError } from "axios"

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    alert(error.response.data.message)
  }
}