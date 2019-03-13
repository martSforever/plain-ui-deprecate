<template>
    <div class="demo-block-item">
        <demo-block-example :html="block.html" :js="block.js" :css="block.css"/>
        <div v-if="block.html">{{block.html}}</div>
        <div v-if="block.js">{{block.js}}</div>
        <div v-if="block.css">{{block.css}}</div>
    </div>
</template>
<script>
    import DemoBlockExample from "./demo-block-example";

    export default {
        name: "demo-block-item",
        components: {DemoBlockExample},
        props: {
            block: {},
        },
    }
</script>

<style lang="scss">

</style>