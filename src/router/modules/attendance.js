import layout from '@/layout'

export default {
  path: '/attendance',
  name: 'attendance',
  component: layout,
  children: [{
    path: 'index',
    name: 'attendance-index',
    component: () => import('@/views/attendance'),
    meta: {
      title: '考勤',
      icon: 'excel'
    }
  }]
}
