import request from '@/utils/request'

export const queryTopNavMenus = (data) => {
  return request.get('/topNav/queryMenus', data)
}

export const addMenuItem = (data) => {
  return request.put('/topNav/addMenuItem', data)
}

export const modifyMenuItem = (data) => {
  return request.post('/topNav/modifyMenuItem', data)
}

export const delMenuItem = (data) => {
  return request.post('/topNav/delMenuItem', data)
}
