import { isDev } from '@/config/env.js'
import request from '@/utils/request'

export const getPageInfo = async (page) => {
    const api = isDev ? `/data/${page}/index.json` : `/api?name=${page}`
    return await request(api).then(({ data }) => data)
}