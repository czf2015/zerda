import * as models from '../models'
import * as services from '../services'
import API from '../plugins/API'

const configure = (api, Creator) => {
    const Model = models[Creator]
    const Service = services[Creator]
    return Service ? new Service(api, Model) : new API(Model)
}


export const ACCOUNT = configure('/accounts', 'Account')

export const USER = configure('/users', 'User')