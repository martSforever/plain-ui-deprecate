<template>
    <div class="demo-header">
        Plain-UI DEMO
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
        justify-content: flex-start;
        &::after {
            box-shadow: 0 -5px 20px #ddd;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            content: '';
            z-index: 2;
        }
    }
</style>