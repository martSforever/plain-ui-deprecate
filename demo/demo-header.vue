<template>
    <div class="demo-header">
        <span>Plain-UI DEMO</span>
            <link-button-group>
                <link-button box-type="line" label="改变主题："/>
                <link-button v-for="(item,index) in ['default','black','custom']" :label="item" :key="index" @click="$plain.changeTheme(item)"/>
            </link-button-group>
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
    .demo-header {
        height: 64px;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        box-sizing: border-box;
        &::after {
            box-shadow: 0 -5px 20px #ddd;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            content: '';
            z-index: -1;
        }
    }
</style>