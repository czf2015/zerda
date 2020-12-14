import request from '@/utils/request'

const baseURL = '/api'

export class Document {
    static async queryCategory(data) {
        if (typeof data == 'string') {
            return await request({
                method: 'get',
                url: `${baseURL}/catalog/getCatalogOne`,
                params: { catalogId: data }
            })
        } else {
            // {"pageNum":1, "pageSize":2, "platform":"1"}  platform为平台类型   pageNum 第几页   pageSize 每页条数
            return await request({
                method: 'post',
                url: `${baseURL}/catalog/listCatalogManage`,
                data
            })
        }
    }

    /* {
        "platform" : "1", 
        "cnName" : "运维222",
        "enName" : "Operation222",
        "weight" : 150,
        "iconUrl" : "D/local/Operation222"
    } */
    static async updateCategory(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/catalog/updateCatalog`,
            data
        })
    }

    /** {
        "platform" : "1", 
        "cnName" : "运维222",
        "enName" : "Operation222",
        "weight" : 150,
        "iconUrl" : "D/local/Operation222"
    } */
    static async addCategory(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/catalog/addCatalog`,
            data
        })
    }

    static async deleteCategory(id) {
        return await request({
            method: 'delete',
            url: `${baseURL}/catalog/delCatalog`,
            params: {
                catalogId: id
            }
        })
    }

    static async queryProduct(data) {
        if (typeof data == 'string') {
            return await request({
                method: 'get',
                url: `${baseURL}/product/getProduct`,
                params: {
                    catalogId: data
                }
            })
        } else {
            // {"pid":"1319561663770263553", "pageNum":1, "pageSize":2}
            return await request({
                method: 'post',
                url: `${baseURL}/product/listProduct`,
                data
            })
        }
    }

    /* {
        "catalogId": "1322070065243226113",
        "pid": "4444444444",
        "cnName": "运维下转入别的类别8884",
        "enName": "Operation88",
        "weight": 110,
        "forward": "http://77888877"
    } */

    static async updateProduct(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/product/updateProduct`,
            data
        })
    }

    /* {
        "platform" : "2",
        "pid":"1319561663770263553",      //类别的catalogId
        "cnName" : "运维下的999",
        "enName" : "Operation999",
        "weight" : 122,
        "forward" : "http://99999"  
    } */
    static async addProduct(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/product/addProduct`,
            data
        })
    }

    static async deleteProduct(id) {
        return await request({
            method: 'delete',
            url: `${baseURL}/product/deleteProduct`,
            params: {
                catalogId: id
            }
        })
    }

    static async query(params) {
        if ('docId' in params) {
            // docId
            return await request({
                method: 'get',
                url: `${baseURL}/doc/getDoc`,
                params
            })
        } else {
            // catalogId
            return await request({
                method: 'get',
                url: `${baseURL}/doc/getDocAll`,
                params
            })
        }
    }

    /** {
        "docId": "55555",
        "title": "nysql使用手册66",
        "enKey": "nysql-guidance",
        "weight": 147,
        "content": "内容是。。。。。"    //菜单的情况下没有此项
    } */
    static async update(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/doc/updateDoc`,
            data
        })
    }

    /** {
        "pid": "2222",     //根目录下pid为0
        "catalogId": "4444",    //产品的catalogId
        "title": "nysqleeee",    //标题
        "enKey": "nysql-guidance666",
        "weight": 160,    //权重
        "content": "内容是；；；；；；；；；；；",    //新增菜单的情况下没有此项
        "nodeType": "1"            0为菜单   1为文章
    } */
    static async add(data) {
        return await request({
            method: 'post',
            url: `${baseURL}/doc/addDoc`,
            data
        })
    }

    static async delete(docId) {
        return await request({
            method: 'delete',
            url: `${baseURL}/doc/deleteDoc`,
            params: {
                docId
            }
        })
    }
}
