import request from '@/utils/request'

const baseURL = '/api/homepage'
// infoId 更新主键
export class HomePage {
    static async query(infoId) {
        return await request({
            method: 'get',
            url: `${baseURL}/getHomePageContent`,
            params: {
                infoId
            }
        })
    }

    static async update(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/modifyHomePageContent`,
            data
        })
    }

    /** 参数：
    {
        "infoId": "string",
        "plateKeywords": "string",
        "plateName": "string"
    }
     */ 
    static async add(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/addPlate`,
            data
        })
    }

    static async delete(infoId) {
        return await request({
            method: 'delete',
            url: `${baseURL}/deletePlate`,
            params: {
                infoId
            }
        })
    }

    static async list() {
        return await request({
            method: 'get',
            url: `${baseURL}/listPlates`,
        })
    }

    static async adapt(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/modifyPlate`,
            data
        })
    }
}