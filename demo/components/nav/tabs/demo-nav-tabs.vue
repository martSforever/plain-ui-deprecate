<template>
    <div class="demo-nav-tabs">
        <div class="demo-nav-tabs-content">
            <div class="demo-nav-tabs-left">
                <link-button :label="item.title" :box-type="!!item.fill?'fill':'line'" long v-for="(item,index) in menus" :key="index" @click="openTab(item)"/>
            </div>
            <div class="demo-nav-tabs-right">
                <link-nav ref="nav" page404="/nav/test/demo-nav-not-found.vue"/>
                <!--<link-nav ref="nav"-->
                <!--page404="/nav/test/demo-nav-not-found.vue"-->
                <!--:beforeOpenTab="()=>log('beforeOpenTab')"-->
                <!--:afterOpenTab="()=>log('afterOpenTab')"-->
                <!--:beforePush="()=>log('beforePush')"-->
                <!--:afterPush="()=>log('afterPush')"/>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-tabs",
        data() {
            return {
                menus: [
                    {id: 'a', title: '页面一（缓存）', path: '/nav/test/demo-nav-1.vue', param: {msg: 'page1'}},
                    {id: 1, title: '页面一（不缓存）', path: '/nav/test/demo-nav-1.vue', param: {msg: 'page1'}, storage: false},
                    {id: 2, title: 'Icon图标', path: '/normal/demo-icon', param: {msg: 'icon'}},
                    {id: 3, title: 'Button按钮', path: '/normal/demo-button', param: {msg: 'button'}},
                    {id: 4, title: 'Input输入框', path: '/normal/demo-input', param: {msg: 'input'}},
                    {id: 5, title: 'Radio单复选按钮', path: '/normal/demo-radio', param: {msg: 'radio'}},
                    {id: 'not-exist', title: '不存在的页面', path: '/normal/hello world', param: {msg: 'radio'}, fill: true},
                    {id: 2, title: 'Icon替换为Button', path: '/normal/demo-button', param: {msg: 'radio'}, fill: true, refresh: true},
                ]
            }
        },
        methods: {
            openTab(tab) {
                this.$refs.nav.openTab(tab, tab.refresh)
            },

        }
    }
</script>

<style lang="scss">
    .demo-nav-tabs {
        padding: 12px;
        box-sizing: border-box;
        .demo-nav-tabs-content {
            height: 100%;
            width: 100%;
            display: flex;
            & > div {
                height: 100%;
            }
            .demo-nav-tabs-left {
                width: 180px;
                padding-right: 12px;
                box-sizing: border-box;
                & > * {
                    margin-bottom: 12px;
                }
            }
            .demo-nav-tabs-right {
                flex: 1;
            }
        }
    }
</style>