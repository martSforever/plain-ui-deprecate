<template>
    <div class="demo-navigator-main-1">
        <div>
            页面一
            <span>{{pageSecurity}}</span>
        </div>
        <link-button label="回退页面" @click="$nav.back()"/>
        <link-button label="打开页签四" @click="openTab"/>
        <link-button label="打开页面五" @click="openPage"/>
        <link-button label="不存在的页面" @click="openErrorPage"/>
        <link-button label="打开页面：VueCLI3" @click="openVueCli3"/>
        <link-button label="打印日志" @click="log"/>
        <div style="margin-top: 12px">
            <link-button label="监听页签内事件" @click="listenPageEvent"/>
            <link-button label="派发页签内事件" @click="emitPageEvent"/>
            <link-button label="监听全局事件" @click="listenTabEvent"/>
            <link-button label="派发全局事件" @click="emitTabEvent"/>
            <link-button label="移除页签内监听事件" @click="offPageEvent"/>
            <link-button label="移除全局监听事件" @click="offTabEvent"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-1",
        props: {
            tabData: {},
        },
        data() {
            // console.log(this.tabData)
            return {}
        },
        methods: {
            log() {
                // console.log(this.NAV, this.$nav)
                console.log(this.$nav.getCurrentTab())
            },
            openTab() {
                this.$nav.openTab({
                    id: '123',
                    title: '页面四',
                    path: '/navigator/navigator-main/demo-navigator-main-4',
                    param: {hello: 111},
                    security: this.pageSecurity,
                })
            },
            openPage() {
                this.$nav.push('/navigator/navigator-main/demo-navigator-main-5', {
                    hello: 111, callback: () => {
                        console.log('页面一刷新')
                    },
                }, {oauth: '页面新安全性'})
            },
            openErrorPage() {
                this.$nav.push('/navigator/navigator-main/demo-navigator-main-iii')
            },
            openVueCli3() {
                this.$nav.push('https://cli.vuejs.org/zh/config/', null, null, true)
            },

            listenPageEvent() {
                this.$nav.$on('hello',
                    (...args) => {
                        console.log('页面一接受页签内事件：hello', ...args)
                    })
            },
            emitPageEvent() {
                this.$nav.$emit('hello', '页面一派发页签内的数据:' + this.$plain.$utils.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'))
            },
            listenTabEvent() {
                this.$nav.$on('hello', (...args) => {
                    console.log('页面一接受全局事件：hello', ...args)
                }, true)
            },
            emitTabEvent() {
                this.$nav.$emit('hello', '页面一派发全局的数据:' + this.$plain.$utils.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'), true)
            },
            offPageEvent() {
                this.$nav.$off('hello')
            },
            offTabEvent() {
                this.$nav.$off('hello', null, true)
            },
        }
    }
</script>

<style lang="scss">

</style>