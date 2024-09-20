import layout from '@/layout'

export default {
  path: '/department',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/department'),
    name: 'department',
    meta: {
      title: '组织',
      icon: 'tree'
    }
  }]
}
