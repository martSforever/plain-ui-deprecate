import Vue from 'vue'
import Vuex from 'vuex'
import Plain from 'src/index'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Plain, {theme: 'red'})
const store = new Vuex.Store({
    state: {
        testData: 0
    },
    mutations: {
        saveChange(state, val) {
            state.testData = val
        }
    }
})

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
