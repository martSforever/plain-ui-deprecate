<template>
    <div class="pl-navigator-main-page">
        <component :is="page.component" class="pl-navigator-main-page-item"/>
    </div>
</template>

<script>

    export default {
        name: "pl-navigator-main-page",
        components: {},
        props: {
            page: {},
        },
    }
</script>

<style lang="scss">
    .pl-navigator-main-page {
        @include public-style;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: auto;
    }
</style>