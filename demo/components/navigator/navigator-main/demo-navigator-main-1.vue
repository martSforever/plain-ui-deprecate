<template>
    <div class="demo-navigator-main-1">
        <div>
            页面一
        </div>
        <link-button label="回退页面" @click="$nav.back()"/>
        <link-button label="打开页签四" @click="openTab"/>
        <link-button label="打开页面五" @click="openPage"/>
        <link-button label="打印日志" @click="log"/>
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
                console.log(this.NAV, this.$nav)
            },
            openTab() {
                this.$nav.openTab('页面四', '/navigator/navigator-main/demo-navigator-main-4', {hello: 111}, this.tabData.ouath, true)
            },
            openPage() {
                this.$nav.push('/navigator/navigator-main/demo-navigator-main-5', {
                    hello: 111, callback: () => {
                        console.log('页面一刷新')
                    },
                })
            },
        }
    }
</script>

<style lang="scss">

</style>