import Vue from 'vue'
import App from './App.vue'
import plain from 'src'

Vue.config.productionTip = false
Vue.use(plain)

new Vue({
    render: h => h(App),
}).$mount('#app')
