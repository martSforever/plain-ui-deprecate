<template>
    <td class="pl-table-head-cell" :colspan="col.colspan" :rowspan="col.rowspan" @click="p_click">
        <pl-table-cell
                :is-fixed="fixed === col.fixed"
                :scope-slot-func="col.titleScopedSlot"
                :data="{col}"
                :text="col.title"
                :height="headRowHeight"
                :width="col.width"
                :class="[`pl-table-cell-${col.align}`]">
            <div class="pl-table-head-cell-sort" :class="classes" v-if="!!col.sort">
                <pl-icon icon="pl-triangle-up-fill" class="pl-sort-asc-icon"/>
                <pl-icon icon="pl-triangle-down-fill" class="pl-sort-desc-icon"/>
                <!--<link-icon icon="icon-triangle-up" class="pl-sort-asc-icon"/>-->
                <!--<link-icon icon="icon-triangle-down" class="pl-sort-desc-icon"/>-->
            </div>
        </pl-table-cell>
        <div v-if="col.fixed === fixed"
             class="pl-table-head-cell-drag"
             @mousedown="p_mousedown"></div>
    </td>
</template>

<script>
    import PlTableCell from "./pl-table-cell";
    import {TableMixin} from "./index";
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-table-head-cell",
        components: {PlIcon, PlTableCell},
        mixins: [TableMixin],
        props: {
            col: {},                                //渲染的列信息（有可能是列组）
        },
        data() {
            return {
                p_baseTable: null,
                indicator: null,
                startX: null,
                endX: null,
            }
        },
        computed: {
            classes() {
                return {
                    [`pl-table-head-cell-sort-${!!this.sortDesc ? 'desc' : 'asc'}`]: this.sortField === this.col.field
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
            this.p_baseTable = this.$plain.$dom.findComponentUpward(this, 'pl-base-table')
        },
        methods: {
            p_click() {
                this.p_baseTable.$emit('clickTitle', {col: this.col})
            },
            p_mousedown(e) {
                this.startX = e.clientX
                document.addEventListener('mousemove', this.p_mousemove)
                document.addEventListener('mouseup', this.p_mouseup)
                this.$plain.$dom.enableSelectNone()
                this.indicator = document.createElement('div')
                this.indicator.style.width = `${e.target.offsetWidth}px`
                this.indicator.style.backgroundColor = '#ddd'
                this.indicator.style.zIndex = 1
                this.indicator.style.height = `${this.p_baseTable.$el.offsetHeight}px`
                this.indicator.style.display = 'inline-block'
                this.indicator.style.position = 'absolute'
                this.indicator.style.top = `${this.p_baseTable.$el.getBoundingClientRect().top}px`
                this.indicator.style.left = `${e.clientX - e.target.offsetWidth / 2}px`
                document.body.appendChild(this.indicator)
            },
            p_mousemove(e) {
                this.indicator.style.left = `${e.clientX}px`
            },
            p_mouseup(e) {
                document.removeEventListener('mousemove', this.p_mousemove)
                document.removeEventListener('mouseup', this.p_mouseup)
                this.$plain.$dom.disabledSelectNone()
                document.body.removeChild(this.indicator)
                this.endX = e.clientX
                let durX = this.endX - this.startX
                let width = this.dragColumn.width
                width = width + durX
                width = width > 30 ? width : 30
                this.dragColumn.width = width
            },
        }
    }
</script>