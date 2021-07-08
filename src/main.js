import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
// link for build: https://ivanshavliuga.github.io/shulte2/
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
