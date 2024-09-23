import layout from '@/layout'

export default {
  path: '/employee',
  name: 'employee',
  component: layout,
  children: [
    {
      path: 'index',
      name: 'employee-index',
      component: () => import('@/views/employee'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id?',
      component: () => import('@/views/employee/detail.vue'),
      hidden: true,
      meta: {
        title: '员工详情'
      }
    }
  ]
}
