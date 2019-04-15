import Vue from 'vue'
import Vuex from 'vuex'
import plain from 'src'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)
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
