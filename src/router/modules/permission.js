import layout from '@/layout'

export default {
  path: '/permission',
  name: 'permission',
  component: layout,
  children: [{
    path: 'index',
    name: 'permission-index',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限',
      icon: 'lock'
    }
  }]
}
