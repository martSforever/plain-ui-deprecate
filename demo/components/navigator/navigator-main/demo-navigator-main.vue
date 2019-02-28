<template>
    <div class="demo-navigator-main">
        <demo-row title="基本用法">
            <link-button-group>
                <link-button box-type="line" label="打开标签"/>
            </link-button-group>
            <link-button-group>
                <link-button label="页签一,My" @click="openTab('页面一','/navigator/navigator-main/demo-navigator-main-1',{},{oauth:'My'})"/>
                <link-button label="页签二,ORG" @click="openTab('页面二','/navigator/navigator-main/demo-navigator-main-2',{},{oauth:'ORG'})"/>
                <link-button label="页签三,POSTN" @click="openTab('页面三','/navigator/navigator-main/demo-navigator-main-3',{},{oauth:'POSTN'})"/>
                <link-button label="页签四,ALL" @click="openTab('页面四','/navigator/navigator-main/demo-navigator-main-4',{},{oauth:'ALL'})"/>
                <link-button label="页签五,ALL" @click="openTab('页面五','/navigator/navigator-main/demo-navigator-main-5',{},{oauth:'ALL'})"/>
                <link-button label="页签六,ALL" @click="openTab('页面六','/navigator/navigator-main/demo-navigator-main-6',{},{oauth:'ALL'})"/>
                <link-button label="页签七,ALL" @click="openTab('页面七','/navigator/navigator-main/demo-navigator-main-7',{},{oauth:'ALL'})"/>
                <link-button label="页签八,ALL" @click="openTab('页面八','/navigator/navigator-main/demo-navigator-main-8',{},{oauth:'ALL'})"/>
            </link-button-group>
            <link-button-group>
                <link-button label="Icon图标" @click="openTab('Icon图标','/demo-icon')"/>
                <link-button label="Button按钮" @click="openTab('Button按钮','/demo-button')"/>
                <link-button label="Input输入框" @click="openTab('Input输入框','/demo-input')"/>
                <link-button label="Radio单选复选框" @click="openTab('Radio单选复选框Radio单选复选框','/demo-radio')"/>
                <link-button label="Rate评分" @click="openTab('Rate评分','/demo-rate')"/>
            </link-button-group>
        </demo-row>
        <div class="demo-navigator-main-body">
            <link-navigator-main-tab ref="navigator"
                                     :beforeOpenTab="beforeOpenTab"
                                     :afterOpenTab="afterOpenTab"
                                     :beforePush="beforePush"
                                     :afterPush="afterPush"

                                     @openTab="handleOpenTab"
                                     @closeTab="handleCloseTab"

                                     :defaultPage="{
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
        methods: {
            openTab(...args) {
                this.$nav.openTab(...args)
            },
            openPage() {

            },
            beforeOpenTab(data) {
                // console.log(`打开页签前[${data.title}],${data.path}`)
                if (data.title === '页面二') {
                    return Promise.reject("不能打开页面二")
                }
            },
            afterOpenTab(data) {
                // console.log(`打开页签后[${data.title}],${data.path}`)
            },
            beforePush(data) {
                // console.log(`打开页面前[${data.path}]`)
            },
            afterPush(data) {
                // console.log(`打开页面后[${data.path}]`)
            },

            handleOpenTab(page) {
                // console.log('open tab', page)
            },
            handleCloseTab(page) {
                // console.log('close tab', page)
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