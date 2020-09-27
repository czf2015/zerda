import service from '@/utils/request'

export const queryTopNavMenus = (data) => {
  return service.get('/topNav/queryMenus', data)
}

export const addMenuItem = (data) => {
  return service.put('/topNav/addMenuItem', data)
}

export const modifyMenuItem = (data) => {
  return service.post('/topNav/modifyMenuItem', data)
}

export const delMenuItem = (data) => {
  return service.post('/topNav/delMenuItem', data)
}
