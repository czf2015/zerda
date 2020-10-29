import request from '@/utils/request'

const baseURL = '/api/staticContent'
// infoId 更新主键
export class StaticPage {
    static async query(pageId) {
        return await request({
            method: 'get',
            url: `${baseURL}/getPage`,
            params: {
                pageId
            }
        })
    }

    /* 参数:
    {
        "categoryId": "string",
        "content": "string",
        "pageId": "string"
    }
    */
    static async update(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/modifyPage`,
            data
        })
    }

    /** 参数：
    {
        "categoryId": "string",
        "content": "string",
        "pageId": "string"
    }
     */ 
    static async add(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/addPage`,
            data
        })
    }

    static async delete(pageId) {
        return await request({
            method: 'delete',
            url: `${baseURL}/deletePage`,
            params: {
                pageId
            }
        })
    }
}

export class StaticCategory {
    static async query() {
        return await request({
            method: 'get',
            url: `${baseURL}/queryCategorys`,
        })
    }

    /* {
        "categoryId": "string",
        "categoryType": "string",
        "keywords": "string",
        "pid": "string",
        "subCategoryList": [
            null
        ],
        "title": "string",
        "weight": 0
    } */
    static async update(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/modifyCategory`,
            data
        })
    }

    /** {
     "categoryId": "string",
    "categoryType": "string",
    "keywords": "string",
    "pid": "string",
    "subCategoryList": [
        null
    ],
    "title": "string",
    "weight": 0
    } */ 
    static async add(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/addCategory`,
            data
        })
    }

    static async delete(categoryId) {
        return await request({
            method: 'delete',
            url: `${baseURL}/deleteCategory`,
            params: {
                categoryId
            }
        })
    }
}