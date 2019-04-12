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
        created(){
            // console.log(this.$store)
            // console.log(this.$plain.Vue.prototype)
            // console.log(this)
        },
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
</style>