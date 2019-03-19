<template>
    <div class="pl-base-table-cell" :style="styles">
        <template v-if="isFixed">
            <template v-if="editing">
                <pl-scope-slot v-if="editScopedSlots" :scope-slot-func="editScopedSlots" :data="{}"/>
                <pl-render-func v-else-if="editRenderFunc" :render-func="editRenderFunc" :data="{}"/>
            </template>
            <template v-else>
                <pl-scope-slot v-if="defaultScopedSlots" :scope-slot-func="defaultScopedSlots" :data="{}"/>
                <pl-render-func v-else-if="defaultRenderFunc" :render-func="defaultRenderFunc" :data="{}"/>
            </template>

            <slot></slot>
        </template>
    </div>
</template>

<script>
    import PlScopeSlot from "../render/pl-scope-slot";
    import {TableMixin} from "./index";
    import PlTooltipText from "../tooltip/pl-tooltip-text";
    import PlRenderFunc from "../render/pl-render-func";

    export default {
        name: "pl-base-table-cell",
        components: {PlRenderFunc, PlTooltipText, PlScopeSlot},
        mixins: [TableMixin],
        props: {
            data: {},                           //作用域渲染函数渲染的数据
            text: {},                           //没有有作用域渲染函数的时候显示的文本
            width: {},                          //单元格宽度
            height: {},                         //单元格高度
            isFixed: {default: false},          //是否为对应fixed table的cell
            editing: {},                        //当前是否为编辑状态

            editScopedSlots: {},                //作用域插槽：编辑
            defaultScopedSlots: {},             //作用域插槽：正常

            editRenderFunc: {},                 //渲染函数：编辑
            defaultRenderFunc: {},              //渲染函数：正常
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
    .pl-base-table-cell {
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
        .pl-column-text-default-text, .pl-base-table-cell-default-text {
            width: 100%;
        }

        &.pl-base-table-cell-left {
            justify-content: flex-start;
            .pl-base-table-cell-default-text {
                text-align: left;
            }
        }
        &.pl-base-table-cell-center {
            justify-content: center;
            padding: 0;
            .pl-base-table-cell-default-text {
                text-align: center;
            }
        }
        &.pl-base-table-cell-right {
            justify-content: flex-end;
            flex-wrap: revert;
            .pl-base-table-head-cell-sort {
                order: -1;
            }
            .pl-base-table-cell-default-text {
                text-align: right;
            }
        }
    }
</style>