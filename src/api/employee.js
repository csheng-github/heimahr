import request from '@/utils/request'

/** 获取员工列表 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/** 导出员工excel */
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    responseType: 'blob'
  })
}
