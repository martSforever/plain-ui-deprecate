<template>
    <div class="demo-row">
        <div class="demo-row-title">
            <span v-if="!!title">{{title}}</span>
            <div class="demo-row-title-segment"></div>
        </div>
        <div class="demo-row-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-row",
        props: {
            title: {},
        },
    }
</script>

<style lang="scss">
    @include themeify{
        .demo-row {
            @include public-style;
            width: 100%;
            padding: 24px 0 0 24px;
            .demo-row-title {
                display: flex;
                align-items: center;
                color: $p-color-normal-title;
                span {
                    margin-right: 12px;
                }
                .demo-row-title-segment {
                    height: 1px;
                    background-color: $p-color-normal-background-deep;
                    flex: 1;
                }
            }
            .demo-row-content {
                padding: 12px 0;
                & > *:not(:last-child) {
                    margin-right: 12px;
                }
            }
        }
    }
</style>