<template>
    <div class="pl-cascade-option" :style="{width:`${cascadeWidth}px`}">
        <pl-scroll>
            <div class="pl-cascade-option-item" v-for="(item,index) in data" :key="index">
                <span class="pl-cascade-option-item-label">{{item[labelKey]}}</span>
                <pl-icon icon="pl-arrow-right"/>
            </div>
        </pl-scroll>
    </div>
</template>

<script>
    import PlScroll from "../scroll/pl-scroll";
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-cascade-option",
        components: {PlIcon, PlScroll},
        props: {
            data: {type: Array},
            labelKey: {type: String},
            childrenKey: {type: String},
            valueKey: {type: String, required: true},
            cascadeWidth: {type: Number},
        },
    }
</script>

<style lang="scss">
    .pl-cascade-option {
        height: 100%;
        .pl-cascade-option-item {
            min-height: 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            padding: 0 6px;
            cursor: pointer;
            &:hover, &.pl-cascade-option-item-active {
                background-color: $color-primary-light;
            }
        }
    }
</style>