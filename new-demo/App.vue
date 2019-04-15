<template>
    <div class="App" :style="{backgroundImage:`url('${img}')`}">
        App
    </div>
</template>

<script>
    export default {
        name: "App.vue",
        data() {
            return {
                img: require('new-demo/asserts/background.jpg')
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
        .App {
            height: 100%;
            width: 100%;
            background-size: auto 100% ;
        }
    }
</style>