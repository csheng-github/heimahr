import layout from '@/layout'

export default {
  path: '/role',
  name: 'role',
  component: layout,
  children: [{
    path: 'index',
    name: 'role-index',
    component: () => import('@/views/role'),
    meta: {
      title: '角色',
      icon: 'setting'
    }
  }]
}
