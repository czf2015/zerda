import service from '@/utils/request'

const baseUrl = '/api'

export const queryTopNavMenus = (data) => {
  return service({
    url: baseUrl + '/topNav/queryMenus',
    method: 'GET',
    data
  })
}

export const addMenuItem = (data) => {
  return service({
    url: baseUrl + '/topNav/addMenuItem',
    method: 'POST',
    data
  })
}

export const modifyMenuItem = (data) => {
  return service({
    url: baseUrl + '/topNav/modifyMenuItem',
    method: 'POST',
    data
  })
}

export const delMenuItem = (data) => {
  return service({
    url: baseUrl + '/topNav/delMenuItem',
    method: 'POST',
    data
  })
}
