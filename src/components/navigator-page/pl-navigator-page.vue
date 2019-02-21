<template>
    <div class="pl-navigator-page">
        <div class="pl-navigator-page-content">
            <div class="pl-navigator-page-item">
                <slot></slot>
            </div>
            <component v-for="(page,index) in pageStack"
                       class="pl-navigator-page"
                       :key="page.id"
                       :param="page.param"
                       :is="page.component"
                       v-if="page.init"
                       v-show="currentValue === index"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pl-navigator-page",
        props: {
            value: {},
        },
        data() {
            return {
                currentValue: this.value,
                pageStack: [],
            }
        },

    }
</script>

<style lang="scss">
    .pl-navigator-page {
        @include public-style;
        &, & .pl-navigator-page-content {
            height: 100%;
            width: 100%;
        }
        .pl-navigator-page-item {
            width: 100%;
            height: 100%;
            overflow: auto;
        }
    }
</style>