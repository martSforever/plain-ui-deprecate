<template>
    <div class="App">
    </div>
</template>

<script>
    export default {
        name: "App",
        beforeCreate() {
            window.location.href = './demo.html'
        },
    }
</script>

<style lang="scss">
    html, body, .App {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        div {
            box-sizing: border-box;
        }
    }
</style>