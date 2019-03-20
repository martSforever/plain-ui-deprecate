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
            <link-button label="监听事件" @click="listenEvent"/>
            <link-button label="监听一次事件" @click="listenEventOnce"/>
            <link-button label="移除监听事件" @click="offEvent"/>
            &nbsp;
            <link-button label="派发页签内事件" @click="emitPageEvent"/>
            <link-button label="派发全局事件" @click="emitTabEvent"/>
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

            listenEvent() {
                this.$nav.$on('hello', (param) => console.log('页面一接受页签内事件：hello', param))
            },
            listenEventOnce() {
                this.$nav.$once('hello', (param) => console.log('页面一接受页签内事件：hello', param))
            },
            offEvent() {
                this.$nav.$off('hello')
            },

            emitPageEvent() {
                this.$nav.$emit('hello', '页面一派发页签内的数据:' + this.$plain.$utils.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'))
            },
            emitTabEvent() {
                this.$nav.$emit('hello', '页面一派发全局的数据:' + this.$plain.$utils.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'), true)
            },
        }
    }
</script>

<style lang="scss">

</style>