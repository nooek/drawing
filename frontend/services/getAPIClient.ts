import axios from "axios"
import { parseCookies } from "nookies"

export default function getAPIClient(ctx?: any) {
  const { 'drawingauth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:8888'
  })

  api.interceptors.request.use(config => {
    console.log(config)

    return config
  })

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return api
}
