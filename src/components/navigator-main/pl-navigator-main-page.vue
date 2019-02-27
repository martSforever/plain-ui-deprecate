<template>
    <div class="pl-navigator-main-page">
        <component :is="root.component" class="pl-navigator-main-page-item"/>
    </div>
</template>

<script>
    export default {
        name: "pl-navigator-main-page",
        props: {
            root: {},
        },
        mounted() {
        },
    }
</script>

<style lang="scss">
    .pl-navigator-main-page {
        height: 100%;
        .pl-navigator-main-page-item {
            height: 100%;
            width: 100%;
            overflow: auto;
            box-sizing: border-box;
        }
    }
</style>