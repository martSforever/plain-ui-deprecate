<template>
    <div class="lv-table-cell" :style="styles" :class="{'lv-table-cell-costume':!!scopeSlotFunc}">
        <template v-if="isFixed">
            <lv-scope-slot v-if="!!scopeSlotFunc"
                           :scope-slot-func="scopeSlotFunc"
                           :data="data"/>
            <template v-else>
                <span>{{text}}</span>
                <slot></slot>
            </template>
        </template>
    </div>
</template>

<script>
    import LvScopeSlot from "../render/lv-scope-slot";
    import {TableMixin} from "./index";

    export default {
        name: "lv-table-cell",
        components: {LvScopeSlot},
        mixins: [TableMixin],
        props: {
            scopeSlotFunc: {},                  //作用域渲染函数
            data: {},                           //作用域渲染函数渲染的数据
            text: {},                           //没有有作用域渲染函数的时候显示的文本
            width: {},                          //列宽
            isFixed: {default: false},          //是否为对应fixed table的cell
        },
        computed: {
            styles() {
                const styles = {height: this.$lv.$utils.unit(this.rowHeight),}
                this.width != null && (styles.width = this.$lv.$utils.unit(this.width))
                return styles
            },
        },
    }
</script>

<style lang="scss">
    .lv-table-cell {
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
        &.lv-table-cell-costume {
            padding: 0;
        }
        .lv-scope-slot {
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
    }
</style>