<template>
    <div class="pl-color-history">
        <div class="pl-color-history-item pl-color-history-current" :style="{backgroundColor:current}"></div>
        <div class="pl-color-history-item" v-for="color in p_colors" :style="{backgroundColor:color}"></div>
    </div>
</template>

<script>
    export default {
        name: "pl-color-history",
        props: {
            current: {type: String},
        },
        data() {
            return {
                p_colors: [
                    '#FF0000',
                    '#A64B00',
                    '#006363',
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