<template>
    <div class="demo-header">
        <div class="demo-header-content">
            <span>Plain-UI DEMO</span>
            <link-button-group>
                <link-button box-type="line" label="改变主题："/>
                <link-button v-for="(item,index) in ['default','black','custom']" :label="item" :key="index" @click="$plain.changeTheme(item)"/>
            </link-button-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-header",
        mounted() {
        },
    }
</script>

<style lang="scss">
    @include themeify {
        .demo-header {
            height: 64px;
            width: 100%;
            position: relative;
            .demo-header-content {
                height: 100%;
                width: 100%;
                color: $p-color-normal-title;
                padding: 0 12px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                z-index: 2;
                background-color: $p-color-normal-background;
            }
            &::after {
                box-shadow: 0 0 12px $p-color-normal-background-deep;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                content: '';
                z-index: 1;
                height: 1px;
            }
        }
    }
</style>