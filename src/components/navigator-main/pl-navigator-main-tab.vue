<template>
    <div class="pl-navigator-main-tab">
        <component :is="page.component"/>
    </div>
</template>

<script>
    export default {
        name: "pl-navigator-main-tab",
        props: {
            page: {},
        },
    }
</script>

<style lang="scss">
    .pl-navigator-main-tab {
        @include public-style;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: auto;
    }
</style>