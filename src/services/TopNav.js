import request from '@/utils/request'

const baseURL = '/api/topNav'

export class TopNav {
    static async query() {
        return await request({
            method: 'get',
            url: `${baseURL}/queryMenus`,
        })
    }

    static async add(data) { 
        return await request({
            method: 'post',
            url: `${baseURL}/addMenuItem`,
            data
        })
    }

    static async update(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/modifyMenuItem`,
            data
        })
     }

    static async delete(data) { 
        return await request({
            method: 'post',
            url: `${baseURL}/delMenuItem`,
            data
        })
    }
}