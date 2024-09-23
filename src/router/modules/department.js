import layout from '@/layout'

export default {
  path: '/department',
  name: 'department',
  component: layout,
  children: [{
    path: 'index',
    component: () => import('@/views/department'),
    name: 'department-index',
    meta: {
      title: '组织',
      icon: 'tree'
    }
  }]
}
