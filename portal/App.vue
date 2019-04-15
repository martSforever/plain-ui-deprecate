<template>
    <div class="app" :style="{backgroundImage:`url('${img}')`}">
        <div class="app-header">
            app-header
        </div>
    </div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                img: require('portal/asserts/background.jpg')
            }
        },
    }
</script>

<style lang="scss">
    html, body {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }
    @include themeWrap {
        .app {
            height: 100%;
            width: 100%;
            background-size: 100% 100%;
            .app-header {
                background-color: $backgroundColorDeeper;
                height: 80px;
            }
        }
    }
</style>