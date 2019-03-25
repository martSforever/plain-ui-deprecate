<template>
    <div class="pl-table-cell" :style="styles" :class="{'pl-table-cell-costume':!!scopeSlotFunc}">
        <template v-if="isFixed">
            <pl-scope-slot v-if="!!scopeSlotFunc"
                           :scope-slot-func="scopeSlotFunc"
                           :data="data"/>
            <template v-else>
                <div class="pl-table-cell-default-text">
                    <pl-tooltip-text :content="text" show-overflow-tooltip/>
                </div>
                <slot></slot>
            </template>
        </template>
    </div>
</template>

<script>
    import PlScopeSlot from "../render/pl-scope-slot";
    import {TableMixin} from "./index";
    import PlTooltipText from "../tooltip/pl-tooltip-text";

    export default {
        name: "pl-table-cell",
        components: {PlTooltipText, PlScopeSlot},
        mixins: [TableMixin],
        props: {
            scopeSlotFunc: {},                  //作用域渲染函数
            data: {},                           //作用域渲染函数渲染的数据
            text: {},                           //没有有作用域渲染函数的时候显示的文本
            width: {},                          //单元格宽度
            height: {},                         //单元格高度
            isFixed: {default: false},          //是否为对应fixed table的cell
        },
        computed: {
            styles() {
                const styles = {
                    height: this.$plain.$utils.unit(this.height),
                    width: this.$plain.$utils.unit(this.width),
                }
                return styles
            },
        },
    }
</script>

<style lang="scss">
    .pl-table-cell {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 $base-table-cell-padding;
        min-width: 100%;
        &, & > div {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .pl-scope-slot {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            & > div {
                width: 100%;
                .link-input-wrapper {
                    width: initial;
                    flex: 1;
                }
            }
        }
        .pl-column-text-default-text, .pl-table-cell-default-text {
            width: 100%;
        }

        &.pl-table-cell-left {
            justify-content: flex-start;
            .pl-table-cell-default-text {
                text-align: left;
            }
        }
        &.pl-table-cell-center {
            justify-content: center;
            padding: 0;
            .pl-table-cell-default-text {
                text-align: center;
            }
        }
        &.pl-table-cell-right {
            justify-content: flex-end;
            flex-wrap: revert;
            .pl-table-head-cell-sort {
                order: -1;
            }
            .pl-table-cell-default-text {
                text-align: right;
            }
        }
    }
</style>