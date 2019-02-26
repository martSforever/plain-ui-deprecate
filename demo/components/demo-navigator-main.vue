<template>
    <div class="demo-navigator-main">
        <demo-row title="基本用法">
            <link-button-group>
                <link-button box-type="line" label="打开标签"/>
                <link-button label="Icon图标" @click="openTab('Icon图标','/demo-icon')"/>
                <link-button label="Button按钮" @click="openTab('Button按钮','/demo-button')"/>
            </link-button-group>
        </demo-row>
        <div class="demo-navigator-main-body">
            <link-navigator-main ref="navigator"/>
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