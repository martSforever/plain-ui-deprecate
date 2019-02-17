<template>
    <div class="pl-color-history">
        <pl-color class="pl-color-history-item pl-color-history-current" :color="current" :length="30"/>
        <pl-color class="pl-color-history-item" v-for="color in p_colors" :color="color"/>
    </div>
</template>

<script>
    import PlColor from "./pl-color";

    export default {
        name: "pl-color-history",
        components: {PlColor},
        props: {
            current: {type: String},
        },
        data() {
            return {
                p_colors: [
                    '#FF0000aa',
                    '#A64B0066',
                    '#00636344',
                    '#006363ff',
                ]
            }
        },
    }
</script>

<style lang="scss">
    .pl-color-history {
        @include public-style;
        display: flex;
        align-items: center;
        .pl-color-history-item {
            $itemSize: 24px;
            width: $itemSize;
            height: $itemSize;
            border-radius: $itemSize;
            box-sizing: border-box;
            &.pl-color-history-current {
                $currentItemSize: 30px;
                width: $currentItemSize;
                height: $currentItemSize;
                border-radius: $currentItemSize;
            }
            &:not(last-child) {
                margin-right: 6px;
            }
        }
    }
</style>