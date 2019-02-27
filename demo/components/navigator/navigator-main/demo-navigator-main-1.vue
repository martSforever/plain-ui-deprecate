<template>
    <div class="demo-navigator-main-1">
        <div>
            页面一
        </div>
        <link-button label="打开页签四" @click="openTab"/>
        <link-button label="打开页面五" @click="openPage"/>
        <link-button label="打印日志" @click="log"/>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-1",
        methods: {
            log() {
                console.log(this.NAV)
            },
            openTab() {
                this.$openTab('页面四', '/navigator/navigator-main/demo-navigator-main-4', {hello: 111})
            },
            openPage() {
                this.$pushPage('/navigator/navigator-main/demo-navigator-main-5', {hello: 111})
            },
        }
    }
</script>

<style lang="scss">

</style>