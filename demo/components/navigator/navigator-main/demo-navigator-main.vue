<template>
    <div class="demo-navigator-main">
        <demo-row title="基本用法">
            <link-button-group>
                <link-button box-type="line" label="打开标签"/>
            </link-button-group>
            <link-button-group>
                <link-button v-for="(item,index) in tabsData.slice(0,8)" :key="index" :label="item.title" @click="openTab(item)"/>
            </link-button-group>
            <link-button-group>
                <link-button v-for="(item,index) in tabsData.slice(8)" :key="index" :label="item.title" @click="openTab(item)"/>
            </link-button-group>
            <link-button-group>
                <link-button label="刷新Icon页签" @click="$nav.refreshTab('ggg')"/>
                <link-button label="刷新页签三" @click="$nav.refreshTab('ccc')"/>
                <link-button label="打开页签三同时更新数据并刷新页面"
                             @click="$nav.openTab({id: 'ccc', title: '页面三', path: '/navigator/navigator-main/demo-navigator-main-3', param: {}, security: {oauth: 'III'}, data: {}},true)"/>
                <link-button label="更新页签三的数据信息" @click="$nav.updateTab('ccc',{security:{oauth:'HELLO',title:'wahaha'}})"/>
                <link-button label="清除tab导航缓存" @click="$nav.clearTab()"/>
            </link-button-group>
        </demo-row>
        <div class="demo-navigator-main-body">
            <link-navigator-main-tab ref="navigator"
                                     :beforeOpenTab="beforeOpenTab"
                                     :afterOpenTab="afterOpenTab"
                                     :beforePush="beforePush"
                                     :afterPush="afterPush"

                                     :idGenerator="idGenerator"

                                     @openTab="handleOpenTab"
                                     @closeTab="handleCloseTab"

                                     :defaultPage="{
                                        id:'111',
                                        title:'主页',
                                        path:'/navigator/navigator-main/demo-navigator-main-1',
                                        security:{oauth:'My'}
                                     }"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main",
        mounted() {
        },
        data() {
            return {
                tabsData: [
                    {id: 'aaa', title: '页面一', path: '/navigator/navigator-main/demo-navigator-main-1', param: {}, security: {oauth: 'My'}, data: {}},
                    {id: 'bbb', title: '页面二', path: '/navigator/navigator-main/demo-navigator-main-2', param: {}, security: {oauth: 'ORG'}, data: {}},
                    {id: 'ccc', title: '页面三', path: '/navigator/navigator-main/demo-navigator-main-3', param: {}, security: {oauth: 'POSTN'}, data: {}},
                    {id: null, title: '页面四', path: '/navigator/navigator-main/demo-navigator-main-4', param: {}, security: {oauth: 'ALL'}, data: {}},
                    {id: 'eee', title: '页面五', path: '/navigator/navigator-main/demo-navigator-main-5', param: {}, security: {}, data: {}},
                    {id: 'fff', title: '页面六', path: '/navigator/navigator-main/demo-navigator-main-6', param: {}, security: {}, data: {}},
                    {id: 'hhh', title: '页面七', path: '/navigator/navigator-main/demo-navigator-main-7', param: {}, security: {}, data: {}},
                    {id: 'iii', title: '页面八', path: '/navigator/navigator-main/demo-navigator-main-8', param: {}, security: {}, data: {}},
                    {id: 'ggg', title: 'Icon图标', path: '/demo-icon', param: {}, security: {}, data: {}},
                    {id: 'kkk', title: 'Button按钮', path: '/demo-button', param: {}, security: {}, data: {}},
                    {id: 'lll', title: 'Input输入框', path: '/demo-input', param: {}, security: {}, data: {}},
                    {id: 'mmm', title: 'Radio单选复选框Radio单选复选框', path: '/demo-radio', param: {}, security: {}, data: {}},
                    {id: 'nnn', title: 'Rate评分', path: '/demo-rate', param: {}, security: {}, data: {}},
                ]
            }
        },
        methods: {
            openTab({id, title, path, param, security, data}) {
                this.$nav.openTab({id, title, path, param, security, data})
            },
            openPage() {

            },
            beforeOpenTab(data) {
                console.log(`打开页签前[${data.title}],${data.path}`, data)

                if (!data.id) {
                    data.id = this.$plain.$utils.uuid()
                }

                if (data.title === '页面二') {
                    return Promise.reject("不能打开页面二")
                }
            },
            afterOpenTab(data) {
                console.log(`打开页签后[${data.title}],${data.path}`)
            },
            beforePush(data) {
                console.log(`打开页面前[${data.path}]`)
            },
            afterPush(data) {
                console.log(`打开页面后[${data.path}]`)
            },

            handleOpenTab(page) {
                // console.log('open tab', page)
            },
            handleCloseTab(page) {
                // console.log('close tab', page)
            },

            idGenerator({id, title, path, param, security, data}) {
                return title + path
            },
        }
    }
</script>

<style lang="scss">
    .demo-navigator-main {
        @include public-style;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        .demo-navigator-main-body {
            flex: 1;
        }
    }
</style>