import request from '@/utils/request'

const baseURL = '/api/footer'

export class FooterInfo {
    static async query() {
        return await request({
            method: 'get',
            url: `${baseURL}/queryFooterInfo`,
        })
    }

    // static async create(data) { 
    //     return await request({
    //         method: 'post',
    //         url: `${baseURL}/modifyFooterInfo`,
    //         data
    //     })
    // }

    static async update(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/modifyFooterInfo`,
            data
        })
     }

    // static async delete(data) { 
    //     console.log(data)
    // }
}