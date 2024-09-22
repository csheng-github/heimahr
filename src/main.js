import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI)

// 按钮权限指令
Vue.directive('permission', {
  inserted(el, binding) {
    const points = store.state.user.userInfo?.roles?.points || []
    if (!points.includes(binding.value)) {
      el.remove()
    }
  }

})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
