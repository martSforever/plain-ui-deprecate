<template>
    <div class="pl-navigator-page">
        <div class="pl-navigator-page-content">
            <div class="pl-navigator-page-item">
                <slot></slot>
            </div>
            <component v-for="(page,index) in pageStack"
                       class="pl-navigator-page-item"
                       :key="page.id"
                       :param="page.param || {}"
                       :is="page.component"
                       v-if="page.init"
                       v-show="index === pageStack.length-1"/>
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
        methods: {
            async push(path, param) {
                const component = await this.$plain.pageRegistry(path)
                this.pageStack.push({
                    id: this.$plain.$utils.uuid(),
                    init: true,
                    path,
                    param,
                    component
                })
            },
            async back() {
                this.pageStack.pop()
            },
        }

    }
</script>

<style lang="scss">
    .pl-navigator-page {
        @include public-style;
        &, & .pl-navigator-page-content {
            height: 100%;
            width: 100%;
        }
        .pl-navigator-page-content {
            position: relative;
            .pl-navigator-page-item {
                top: 0;
                left: 0;
                position: absolute;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: white;
                padding: 12px;
                box-sizing: border-box;
            }
        }
    }
</style>