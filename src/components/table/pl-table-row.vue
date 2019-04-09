<template>
    <pl-table-cell-controller
            ref="controller"
            class="pl-table-row"
            @click.native="p_click"
            @dblclick.native="p_dblclick"
            @mouseenter.native="p_enter"
            @mouseleave.native="p_leave"
            :default-editing="defaultEnableEditable"
            :class="{'pl-table-row-hover':p_hover,'pl-table-row-selected':p_selected,'pl-table-row-editing':p_editing}">
        <td v-for="(col,colIndex) in columns" :key="colIndex">
            <pl-table-cell
                    :is-fixed="col.fixed === fixed"
                    :scope-slot-func="col.colScopedSlot"
                    :data="{row,rowIndex,col,colIndex,editRow}"
                    :text="row[col.field]"
                    :height="rowHeight"
                    :width="col.width"
            />
        </td>
    </pl-table-cell-controller>
</template>

<script>
    import PlTableCell from "./pl-table-cell";
    import {TableMixin} from "./index";
    import PlTableCellController from "./pl-table-cell-controller";

    export default {
        name: "pl-table-row",
        components: {PlTableCellController, PlTableCell},
        mixins: [TableMixin],
        props: {
            columns: {},
            row: {},
            rowIndex: {},
            editRow: {},
        },
        data() {
            return {
                p_baseTable: null,
                p_hover: false,
                p_selected: false,
                p_editing: this.defaultEnableEditable,
            }
        },
        mounted() {
            this.p_baseTable = this.$plain.$dom.findComponentUpward(this, 'pl-base-table')
            this.p_baseTable.p_rowAdd({row: this, position: this.fixed})
        },
        beforeDestroy() {
            this.p_baseTable.p_rowRemove({row: this, position: this.fixed})
        },
        methods: {
            /**
             * 选中
             * @author  韦胜健
             * @date    2019/1/9 18:04
             */
            select() {
                this.p_selected = true
            },
            /**
             * 取消选中
             * @author  韦胜健
             * @date    2019/1/9 18:04
             */
            unselect() {
                this.p_selected = false
            },
            /**
             * 校验
             * @author  韦胜健
             * @date    2019/1/14 16:52
             */
            validate() {
                return this.$refs.controller.validate()
            },

            /**
             * 开启编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            async enableEdit() {
                this.p_editing = true
                this.$refs.controller.enableEdit()
            },
            /**
             * 关闭编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            disableEdit() {
                this.p_editing = false
                this.$refs.controller.disableEdit()
            },

            /**
             * 单击事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_click() {
                const param = {row: this, rowIndex: this.rowIndex, position: this.fixed}
                this.p_baseTable.$emit('rowClick', param)
                this.$emit('click', param)
            },
            /**
             * 双击事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_dblclick() {
                const param = {row: this, rowIndex: this.rowIndex, position: this.fixed}
                this.p_baseTable.$emit('rowDblClick', param)
                this.$emit('dblclick', param)
            },
            /**
             * 鼠标悬浮事件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_enter() {
                this.p_baseTable.$emit('rowEnter', {row: this, rowIndex: this.rowIndex, position: this.fixed})
            },
            /**
             * 鼠标离开事件
             * @author  韦胜健
             * @date    2019/1/9 11:22
             */
            p_leave() {
                this.p_baseTable.$emit('rowLeave', {row: this, rowIndex: this.rowIndex, position: this.fixed})
            },
        }
    }
</script>

<style lang="scss">
    .pl-table-row {
        &.pl-table-row-hover {
            background-color: $p-base-table-hover-row-background;
        }
        &.pl-table-row-editing {
            background-color: initial;
        }
        &.pl-table-row-selected {
            background-color: $p-base-table-hover-row-background;
        }
        .pl-table-cell {
            font-size: 12px;
            font-weight: 500;
        }
    }
</style>