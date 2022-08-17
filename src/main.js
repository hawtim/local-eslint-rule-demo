import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

try {
  new Vue({
    el: '#app',
    store,
    render: h => h(App),
  }).$mount('#app')
} catch (error) {
  
}

// new Vue({
//   el: '#app',
//   store,
//   render: h => h(App),
// }).$mount('#app')