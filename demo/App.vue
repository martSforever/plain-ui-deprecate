<template>
    <div class="app">
        <demo-main/>
    </div>
</template>

<script>
    import DemoMain from "./demo-main";

    export default {
        name: "App",
        components: {DemoMain},
    }
</script>

<style lang="scss">
    .app {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100vw;
    }

    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
    }
    :root{
        --p-color-primary: red !important;
    }
</style>