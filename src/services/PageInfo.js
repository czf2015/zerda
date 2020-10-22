import { isDev } from '@/config/env.js'
import request from '@/utils/request'

export class PageInfo {
    static async query(page) {
        // const api = isDev ? `/data/${page}/index.json` : `/api/page?name=${page}`
        const api = `/data/${page}/index.json`
        return request(api)
        // return await request({
        //     method: 'get',
        //     url: '/api/page',
        //     params: {
        //         name: page
        //     }
        // })
    }

    static async add(page) { }

    static async update(data) {
        return await request({
            method: 'put',
            url: '/api/page',
            data
        })
     }

    static async delete(page) { 
        console.log(page)
    }
}