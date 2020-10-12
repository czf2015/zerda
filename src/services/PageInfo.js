import { isDev } from '@/config/env.js'
import request from '@/utils/request'

export class PageInfo {
    static async query(page) {
        const api = isDev ? `/data/${page}/index.json` : `/api?name=${page}`
        return await request(api).then(({ data }) => data)
    }

    static async create(page) { }

    static async update(page) { }

    static async delete(page) { }
}