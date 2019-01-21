import Vue from 'vue'
import App from './App.vue'
import LV from 'src'

Vue.config.productionTip = false
Vue.use(LV)

new Vue({
    render: h => h(App),
}).$mount('#app')
