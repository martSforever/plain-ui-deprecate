<template>
    <div class="pl-cascade-option" :style="{width:`${cascadeWidth}px`}" v-if="!!data && data.length>0">
        <pl-scroll>
            <div class="pl-cascade-option-item"
                 v-for="(item,index) in data"
                 :key="index"
                 :class="p_itemClass(item)"
                 @click="p_click(item)">
                <span class="pl-cascade-option-item-label">{{item[labelKey]}}</span>
                <pl-icon class="pl-cascade-option-item-icon" icon="pl-arrow-right-light" v-if="p_hasChildren(item)"/>
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
            disabledKey: {type: String},
            cascadeWidth: {type: Number},
            current: {required: true},
        },
        methods: {
            p_click(itemData) {
                if (!!this.disabledKey && !!itemData[this.disabledKey]) return
                this.$emit('select', itemData)
                if (!this.p_hasChildren(itemData)) this.$emit('done', itemData)
            },
            p_hasChildren(item) {
                return item[this.childrenKey] && item[this.childrenKey].length > 0
            },
            p_isSelected(item) {
                if (!this.current) return false
                return item[this.valueKey] === this.current[this.valueKey]
            },
            p_itemClass(item) {
                return {
                    'pl-cascade-option-item-active': this.p_isSelected(item),
                    'pl-cascade-option-item-disabled': !!this.disabledKey && item[this.disabledKey]
                }
            },
        },

    }
</script>

<style lang="scss">
    .pl-cascade-option {
        height: 100%;
        display: inline-block;
        vertical-align: top;
        .pl-cascade-option-item {
            min-height: 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            padding: 0 6px;
            cursor: pointer;
            .pl-cascade-option-item-icon {
                transform: scale(0.9);
                color: #AAA;
            }
            &:hover, &.pl-cascade-option-item-active {
                background-color: $color-primary-light;
            }
            &.pl-cascade-option-item-disabled {
                background-color: $color-normal-disabled;
                color: #AAA;
            }
        }
    }
</style>