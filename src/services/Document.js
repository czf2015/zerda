import request from '@/utils/request'

const baseURL = '/api/doc'
// docId 更新主键
export class DocumentEdit {
    static async query(docId) {
        return await request({
            method: 'get',
            url: `${baseURL}/getDoc`,
            params: {
                docId
            }
        })
    }

    /* 参数:
    {
        // "catalogId": "string",
        "categoryName": "string",
        // "children": [
        //     null
        // ],
        // "committer": "string",
        "content": "string",
        // "createTime": "2020-11-16T06:05:14.139Z",
        // "creator": "string",
        "docId": "string",
        "enKey": "string",
        // "nodeType": "string",
        // "optStatus": "string",
        // "pid": "string",
        "productName": "string",
        // "status": "string",
        "title": "string",
        // "updateTime": "2020-11-16T06:05:14.139Z",
        "weight": 0
    }
    */
    static async update(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/updateDoc`,
            data
        })
    }

    /** 参数：
    {
        "categoryId": "string",
        "content": "string",
        // "pageId": "string"
    }
     */ 
    static async add(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/addPage`,
            data
        })
    }

    static async delete(categoryId) {
        return await request({
            method: 'delete',
            url: `${baseURL}/deletePage`,
            params: {
                categoryId
            }
        })
    }
}

export class DynamicCategory {
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