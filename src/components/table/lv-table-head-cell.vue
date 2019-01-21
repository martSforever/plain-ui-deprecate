<template>
    <td class="lv-table-head-cell" :colspan="col.colspan" :rowspan="col.rowspan" @click="lv_click">
        <lv-table-cell
                :is-fixed="fixed === col.fixed"
                :scope-slot-func="col.titleScopedSlot"
                :data="{col}"
                :text="col.title"
                :row-height="null"
                :class="[`lv-table-cell-${col.align}`]">
            <div class="lv-table-head-cell-sort" :class="classes" v-if="!!col.sort">
                <lv-icon icon="lv-triangle-up-fill" class="lv-sort-asc-icon"/>
                <lv-icon icon="lv-triangle-down-fill" class="lv-sort-desc-icon"/>
                <!--<link-icon icon="icon-triangle-up" class="lv-sort-asc-icon"/>-->
                <!--<link-icon icon="icon-triangle-down" class="lv-sort-desc-icon"/>-->
            </div>
        </lv-table-cell>
        <div v-if="col.fixed === fixed"
             class="lv-table-head-cell-drag"
             @mousedown="lv_mousedown"></div>
    </td>
</template>

<script>
    import LvTableCell from "./lv-table-cell";
    import {TableMixin} from "./index";
    import LvIcon from "../icon/lv-icon";

    export default {
        name: "lv-table-head-cell",
        components: {LvIcon, LvTableCell},
        mixins: [TableMixin],
        props: {
            col: {},                                //渲染的列信息（有可能是列组）
        },
        data() {
            return {
                lv_baseTable: null,
                indicator: null,
                startX: null,
                endX: null,
            }
        },
        computed: {
            classes() {
                return {
                    [`lv-table-head-cell-sort-${!!this.sortDesc ? 'desc' : 'asc'}`]: this.sortField === this.col.field
                }
            },
            dragColumn() {
                function iterate(column) {
                    if (!!column.group) {
                        return iterate(column.children[column.children.length - 1])
                    } else {
                        return column
                    }
                }

                return iterate(this.col)
            },
        },
        mounted() {
            this.lv_baseTable = this.$lv.$dom.findComponentUpward(this, 'lv-base-table')
        },
        methods: {
            lv_click() {
                this.lv_baseTable.$emit('clickTitle', {col: this.col})
            },
            lv_mousedown(e) {
                this.startX = e.clientX
                document.addEventListener('mousemove', this.lv_mousemove)
                document.addEventListener('mouseup', this.lv_mouseup)
                this.$lv.$dom.enableSelectNone()
                this.indicator = document.createElement('div')
                this.indicator.style.width = `${e.target.offsetWidth}px`
                this.indicator.style.backgroundColor = '#ddd'
                this.indicator.style.zIndex = 1
                this.indicator.style.height = `${this.lv_baseTable.$el.offsetHeight}px`
                this.indicator.style.display = 'inline-block'
                this.indicator.style.position = 'absolute'
                this.indicator.style.top = `${this.lv_baseTable.$el.getBoundingClientRect().top}px`
                this.indicator.style.left = `${e.clientX - e.target.offsetWidth / 2}px`
                document.body.appendChild(this.indicator)
            },
            lv_mousemove(e) {
                this.indicator.style.left = `${e.clientX}px`
            },
            lv_mouseup(e) {
                document.removeEventListener('mousemove', this.lv_mousemove)
                document.removeEventListener('mouseup', this.lv_mouseup)
                this.$lv.$dom.disabledSelectNone()
                document.body.removeChild(this.indicator)
                this.endX = e.clientX
                let durX = this.endX - this.startX
                let width = this.dragColumn.width
                width = width + durX
                width = width > 30 ? width : 30
                this.dragColumn.update({width})
            },
        }
    }
</script>

<style lang="scss">
    .lv-table-head-cell {
        position: relative;
        &:hover {
            background-color: $base-table-head-hover-color;
            cursor: pointer;
            .lv-table-head-cell-sort {
                opacity: 1;
            }
        }
        .lv-table-head-cell-drag {
            width: 8px;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: transparent;
            cursor: w-resize;
        }
        .lv-table-cell {
            display: inline-flex;
            width: 100%;
            min-width: initial;
            vertical-align: middle;
            &.lv-table-cell-left {
                justify-content: flex-start;
            }
            &.lv-table-cell-center {
                justify-content: center;
            }
            &.lv-table-cell-right {
                justify-content: flex-end;
                flex-wrap: revert;
                .lv-table-head-cell-sort {
                    order: -1;
                }
            }
        }
        .lv-table-head-cell-sort {
            width: fit-content;
            margin-left: 6px;
            display: inline-flex;
            vertical-align: middle;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 12px;
            transform: scale(0.5);
            position: relative;
            color: $base-table-head-icon-color;
            opacity: 0;
            &.lv-table-head-cell-sort-asc, &.lv-table-head-cell-sort-desc {
                opacity: 1;
            }
            &.lv-table-head-cell-sort-asc {
                .lv-sort-asc-icon {
                    color: $base-table-head-icon-active-color
                }
            }
            &.lv-table-head-cell-sort-desc {
                .lv-sort-desc-icon {
                    color: $base-table-head-icon-active-color
                }
            }
        }
    }
</style>