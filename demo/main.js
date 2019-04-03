import Vue from 'vue'
import App from './App.vue'
import plain from 'src'
import DemoChild from './demo-child'
import move from 'src/directives/move'

import DemoRow from './demo-row'
import DemoRowItem from './demo-row-item'

Vue.component('demo-row', DemoRow)
Vue.component('demo-row-item', DemoRowItem)

Vue.config.productionTip = false
Vue.use(plain, {
    prefix: 'link',
    iconfont: 'https://at.alicdn.com/t/font_954560_kicgud0zqeb.js',                               //自定义iconfont图表地址
    pageRegistry(path) {
        return new Promise((rs, rj) => import('demo/components' + path.replace('.vue', '') + '.vue').then(module => rs(module.default)).catch(rj))
    },
})
Vue.mixin({
    methods: {
        log() {
            console.log(...arguments)
        },
    },
})
Vue.component('demo-child', DemoChild)
Vue.directive('move', move)

new Vue({
    render: h => h(App),
}).$mount('#app')

/*function load() {
    import('demo/components/demo-icon').then(function (module) {
        console.log(module.default)
    })
}

setTimeout(() => {
    load()
}, 0)*/

// const context = require.context('demo', true, /.*\.vue/)
// const keys = context.keys()
// const filename = './components/demo-box.vue'
// console.log(keys)


/*
async function getPage(path) {
    return new Promise((rs) => {
        import('./' + path + '.vue').then((module) => {
            // console.log(module.default)
            rs(module.default)
        })
    })
}

function logPage(page) {
    return new Promise((rs,) => {
        setTimeout(async () => {
            console.log(await getPage(page))
            rs()
        }, 2000)
    })
}

async function start() {
    await logPage('components/demo-box')
    await logPage('components/demo-tooltip')
    await logPage('components/demo-icon')
    await logPage('components/demo-popover')
    await logPage('components/demo-button')
    await logPage('components/demo-select')
    await logPage('components/demo-collapse')
}

start();*/
