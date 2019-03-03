<template>
    <div class="pl-date-header">
        <div class="pl-date-header-left">
            <slot name="left">
                <pl-icon icon="pl-double-arrow-left"/>
                <pl-icon icon="pl-arrow-left"/>
            </slot>
        </div>
        <div class="pl-date-header-center">
            <slot name="center">
                2018 - 12
            </slot>
        </div>
        <div class="pl-date-header-right">
            <slot name="right">
                <pl-icon icon="pl-double-arrow-right"/>
                <pl-icon icon="pl-arrow-right"/>
            </slot>
        </div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-date-header",
        components: {PlIcon}
    }
</script>

<style lang="scss">
    .pl-date-header {
        @include public-style;
        height: 40px;
        display: flex;
        flex-direction: row;
        .pl-date-header-left, .pl-date-header-right {
            width: 60px;
            padding: 0 9px;
            box-sizing: border-box;
        }
        .pl-date-header-center {
            flex: 1;
        }
        .pl-date-header-left, .pl-date-header-center, .pl-date-header-right {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $color-normal-content;
        }
        .pl-date-header-left {
            justify-content: flex-start;
        }
        .pl-date-header-right {
            justify-content: flex-end;
        }
    }
</style>