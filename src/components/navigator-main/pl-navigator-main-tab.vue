<template>
    <div class="pl-navigator-main-tab">
        <pl-navigator-main-page :root="page"/>
    </div>
</template>

<script>
    import PlNavigatorMainPage from "./pl-navigator-main-page";

    export default {
        name: "pl-navigator-main-tab",
        components: {PlNavigatorMainPage},
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