<template>
    <div class="pl-navigator-main-page">
        <div class="pl-navigator-main-page-wrapper">
            <component :is="tab.component" class="pl-navigator-main-page-item" key="root"/>
            <component
                    v-for="(page) in pageStack"
                    :key="page.id"
                    :path="page.path"
                    :is="page.component"
                    :param="page.param || {}"
                    v-if="page.initialized"/>
        </div>
    </div>
</template>

<script>

    export default {
        name: "pl-navigator-main-page",
        components: {},
        props: {
            tab: {},
        },
        data() {
            const pageStack = []
            return {
                pageStack,
            }
        },
        methods: {
            async push() {

            },
        }
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
        .pl-navigator-main-page-wrapper {
            height: 100%;
            width: 100%;
            position: relative;
            .pl-navigator-main-page-item {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: auto;
                box-sizing: border-box;
            }
        }
    }
</style>