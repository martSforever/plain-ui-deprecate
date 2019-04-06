<template>
    <div class="pl-cascade-option" :style="{width:`${cascadeWidth}px`}" v-if="!!data && data.length>0">
        <pl-scroll>
            <pl-cascade-option-item v-for="(item,index) in data"
                                    :key="item[valueKey]+index"

                                    :data="item"
                                    :label-key="labelKey"
                                    :children-key="childrenKey"
                                    :value-key="valueKey"
                                    :disabled-key="disabledKey"
                                    :current="current"
                                    :load-data-func="loadDataFunc"

                                    @click="component=>p_click(item,component)"/>
        </pl-scroll>
    </div>
</template>

<script>
    import PlScroll from "../scroll/pl-scroll";
    import PlIcon from "../icon/pl-icon";
    import PlCascadeOptionItem from "./pl-cascade-option-item";
    import {CascadeMixin} from "./index";

    export default {
        name: "pl-cascade-option",
        components: {PlCascadeOptionItem, PlIcon, PlScroll},
        mixins: [CascadeMixin],
        methods: {
            p_click(itemData, component) {
                if (!!this.disabledKey && !!itemData[this.disabledKey]) return
                this.$emit('select', itemData)
                if (!component.p_hasChildren) this.$emit('done', itemData)
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
            box-sizing: border-box;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            padding: 6px 6px;
            cursor: pointer;
            .pl-cascade-option-item-icon {
                transform: scale(0.9);
                color: #AAA;
            }
            &:hover, &.pl-cascade-option-item-active {
                background-color: var(--p-color-primary-light);
            }
            &.pl-cascade-option-item-disabled {
                background-color: var(--p-color-disabled);
                color: #AAA;
            }
        }
    }
</style>