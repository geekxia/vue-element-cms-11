import request from '@/utils/request'


// 新增或编辑
export function fetchGoodUpdate(data) {
  return request({
    url: '/good/update',
    method: 'POST',
    data
  })
}


export function fetchCates(params) {
  return request({
    url: '/good/cates',
    method: 'GET',
    params
  })
}



export function fetchGoodList(params) {
  return request({
    url: '/good/list',
    method: 'GET',
    params
  })
}

export function fetchGoodDel(params) {
  return request({
    url: '/good/del',
    method: 'GET',
    params
  })
}

export function fetchGoodInfo(params) {
  return request({
    url: '/good/info',
    method: 'GET',
    params
  })
}
