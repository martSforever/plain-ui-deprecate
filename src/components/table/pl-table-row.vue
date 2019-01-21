<template>
    <tr class="pl-table-row"
        @click="p_click"
        @dblclick="p_dblclick"
        @mouseenter="p_enter"
        @mouseleave="p_leave"
        :class="{'pl-table-row-hover':p_hover,'pl-table-row-selected':p_selected}">
        <td v-for="(col,colIndex) in columns" :key="colIndex">
            <pl-table-cell
                    :is-fixed="col.fixed === fixed"
                    :scope-slot-func="col.colScopedSlot"
                    :data="{row,rowIndex,col,colIndex,editRow}"
                    :text="row[col.field]"
                    :row-height="rowHeight"
                    :width="col.width"
            />
        </td>
    </tr>
</template>

<script>
    import PlTableCell from "./pl-table-cell";
    import {TableMixin} from "./index";

    export default {
        name: "pl-table-row",
        components: {PlTableCell},
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
                p_editing: false,
                items: [],
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
                // TODO 这里校验规则需要修正
                let flag = true                     //输入是否通过标识
                let validateMsg = null;             //输入不通过提示信息
                let field = null;                   //输入不通过字段

                this.items.forEach(item => {
                    const inputs = this.$plain.$dom.findComponentsDownward(item, 'link-input')
                    inputs.forEach(input => {
                        if (!flag) return
                        if (!input.validate()) {
                            flag = false
                            validateMsg = input.validateMsg
                            field = item.field
                        }
                    })
                })

                return {flag, field, validateMsg}
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
            /**
             * 添加子编辑组件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_add(item) {
                this.items.push(item)
            },
            /**
             * 不添加子编辑组件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_remove(item) {
                this.$plain.$utils.removeFromArray(this.items, item)
            },


            /**
             * 开启编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            enableEdit() {
                this.items.forEach(item => item.enableEdit())
                this.p_editing = true
            },
            /**
             * 关闭编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            disableEdit() {
                this.items.forEach(item => item.disableEdit())
                this.p_editing = false
            },
        }
    }
</script>

<style lang="scss">
    .pl-table-row {
        &.pl-table-row-hover, &.pl-table-row-selected {
            background-color: $base-table-hover-row-background;
        }
        .pl-table-cell {
            font-size: 12px;
            font-weight: 500;
        }
    }
</style>