<template>
    <div class="demo-navigator-main">
        <demo-row title="基本用法">
            <link-button-group>
                <link-button box-type="line" label="打开标签"/>
                <link-button label="页签一" @click="openTab('页面一','/navigator/navigator-main/demo-navigator-main-1')"/>
                <link-button label="页签二" @click="openTab('页面二','/navigator/navigator-main/demo-navigator-main-2')"/>
                <link-button label="页签三" @click="openTab('页面三','/navigator/navigator-main/demo-navigator-main-3')"/>
                <link-button label="页签四" @click="openTab('页面四','/navigator/navigator-main/demo-navigator-main-4')"/>
                <link-button label="Icon图标" @click="openTab('Icon图标','/demo-icon')"/>
                <link-button label="Button按钮" @click="openTab('Button按钮','/demo-button')"/>
                <link-button label="Input输入框" @click="openTab('Input输入框','/demo-input')"/>
            </link-button-group>
        </demo-row>
        <div class="demo-navigator-main-body">
            <link-navigator-main-tab ref="navigator"/>
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