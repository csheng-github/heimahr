import layout from '@/layout'

export default {
  path: '/social',
  component: layout,
  name: 'social',
  children: [{
    path: 'index',
    name: 'social-index',
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
