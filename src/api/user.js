import request from '@/utils/request'

export function fetchLogin(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
