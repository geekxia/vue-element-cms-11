import request from '@/utils/request'

// 新增或编辑
export function fetchAdUpdate(data) {
  return request({
    url: '/ad/update',
    method: 'POST',
    data
  })
}

// 删除
export function fetchAdDel(params) {
  return request({
    url: '/ad/del',
    method: 'GET',
    params
  })
}

export function fetchAdList(params) {
  return request({
    url: '/ad/list',
    method: 'GET',
    params
  })
}
