<template>
    <div class="pl-base-table-cell" :style="styles" :class="[`pl-base-table-cell-${col.align}`]">
        <template v-if="isFixed">
            <keep-alive>
                <template v-if="!!p_editing">
                    <pl-scope-slot v-if="editScopedSlots" :scope-slot-func="editScopedSlots" :data="data"/>
                    <pl-render-func v-else-if="editRenderFunc" :render-func="editRenderFunc" :data="data"/>
                </template>
                <template v-else>
                    <pl-tooltip-text :disabled="!col.tooltip"
                                     :content="p_text"
                                     show-overflow-tooltip>
                        <pl-scope-slot v-if="defaultScopedSlots" :scope-slot-func="defaultScopedSlots" :data="data"/>
                        <pl-render-func v-else-if="defaultRenderFunc" :render-func="defaultRenderFunc" :data="data"/>
                    </pl-tooltip-text>
                </template>
            </keep-alive>
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
            data: {},                               //作用域渲染函数渲染的数据
            text: {},                               //没有有作用域渲染函数的时候显示的文本
            width: {},                              //单元格宽度
            height: {},                             //单元格高度
            isFixed: {default: false},              //是否为对应fixed table的cell
            editing: {},                            //当前是否为编辑状态
            col: {},                                //列信息数据

            editScopedSlots: {type: Function},      //作用域插槽：编辑
            defaultScopedSlots: {type: Function},   //作用域插槽：正常

            editRenderFunc: {type: Function},       //渲染函数：编辑
            defaultRenderFunc: {type: Function},    //渲染函数：正常
        },
        data() {
            return {
                p_text: this.text
            }
        },
        watch: {
            text: {
                immediate: true,
                handler(val) {
                    this.p_text = val
                },
            }
        },
        computed: {
            styles() {
                const styles = {
                    height: this.$plain.$utils.unit(this.height),
                    width: this.$plain.$utils.unit(this.width),
                }
                return styles
            },
            p_editing() {
                if (this.data.rowIndex == null && this.data.colIndex == null) return
                const editable = this.editing && this.data.col.editable
                return editable && (!this.data.col.editableFunc || this.data.col.editableFunc(this.data))
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
        &.pl-base-table-cell {
            &.pl-base-table-cell-left {
                .pl-render-func, .pl-scope-slot {
                    text-align: left;
                }
            }
            &.pl-base-table-cell-right {
                flex-flow: row-reverse;
                .pl-render-func, .pl-scope-slot {
                    text-align: right;
                }
            }
            &.pl-base-table-cell-center {
                .pl-render-func, .pl-scope-slot {
                    text-align: center;
                }
            }

            .pl-tooltip-text {
                .pl-scope-slot, .pl-render-func {
                    display: inline-block;
                    width: max-content;
                }
            }
        }
        &, & > div {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>