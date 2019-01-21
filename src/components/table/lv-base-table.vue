<template>
    <div class="lv-base-table"
         :class="classes"
         @mouseleave="lv_hover=null">
        <lv-table-column-controller @collect="lv_collect" ref="controller">
            <slot></slot>
        </lv-table-column-controller>
        <lv-table-head
                v-if="!noHeader"
                ref="head"
                :fixed-exist="lv_fixedExist"
                :head-columns="lv_headColumns"
                :body-columns="lv_bodyColumns"
                :sort-field="lv_sortField"
                :sort-desc="lv_sortDesc"
                @mouseenter.native="lv_hover = 'head'"
                @scroll="e=>lv_hover === 'head' && $refs.body.$refs.center[0].$refs.scroll.setScroll({x: e.target.scrollLeft})"/>
        <lv-table-body
                ref="body"
                :data="data"
                :edit-data="lv_editData"
                :body-columns="lv_bodyColumns"
                :fixed-exist="lv_fixedExist"
                :row-height="rowHeight"
                :row-num="rowNum"
                @mouseenter.native="lv_hover = 'body'"
                @scroll="e=>lv_hover !== 'head' && !!$refs.head && $refs.head.$refs.scroll.setScroll({x: e.target.scrollLeft})"/>
    </div>
</template>

<script>
    import LvTableColumnController from "./lv-table-column-controller";
    import {MountedMixin} from "../../mixin/component-mixin";
    import {TableMixin} from "./index";
    import LvTableHead from "./lv-table-head";
    import LvTableBody from "./lv-table-body";
    import {deepCopy} from "../../utils/utils";

    /**
     * 表头行高只能通过css设置，.lv-table-head tr:not(.lv-table-column-space){}
     * @author  韦胜健
     * @date    2019/1/7 15:03
     */
    export default {
        name: "lv-base-table",
        components: {LvTableBody, LvTableHead, LvTableColumnController},
        mixins: [MountedMixin, TableMixin],
        props: {
            multiSelect: {type: Boolean},               //是否多选
            selectIndex: {},
        },
        data() {
            return {
                columns: [],                            //所有列
                lv_editData: [],                        //编辑数据数组
                lv_hoverIndex: null,                    //鼠标浮动所在的行索引
                lv_selectedIndex: [],                   //选中的行索引数组
                lv_hostWidth: null,                     //表格显示宽度
                lv_hover: null,                         //鼠标是否覆盖在表格上
                lv_scrollLeft: false,                   //内容是否滑动到左端
                lv_scrollRight: false,                  //内容是否滑动到右端
                lv_sortField: this.sortField,           //排序字段
                lv_sortDesc: this.sortDesc,             //排序方式，先序降序
                content: {                              //各个表格的数据对象，rows：lv-table-row组件对象、timer排序定时器
                    left: {rows: [], timer: null},
                    center: {rows: [], timer: null},
                    right: {rows: [], timer: null},
                },
            }
        },
        watch: {
            /**
             * 监听data变化，设置editData
             * @author  韦胜健
             * @date    2019/1/8 19:19
             */
            data: {
                immediate: true,
                handler(newVal) {
                    if (!newVal || newVal.length === 0) return
                    newVal.forEach((row, index) => {
                        row.lv_id == null && (this.$set(row, 'lv_id', this.$plain.$utils.uuid()))
                        const editRow = this.$plain.$utils.findOne(this.lv_editData, item => item.lv_id === row.lv_id)
                        if (!editRow) this.lv_editData.splice(index, 0, deepCopy(row))
                    })

                    for (let i = 0; i < this.lv_editData.length; i++) {
                        const editRow = this.lv_editData[i];
                        if (newVal.every(row => row.lv_id !== editRow.lv_id)) {
                            this.lv_editData.splice(i, 1)
                            i--
                        }
                    }

                }
            },
            /**
             * 监听selectIndex的变化，设置选中的行
             * @author  韦胜健
             * @date    2019/1/12 10:19
             */
            selectIndex(val) {
                this.$nextTick(() => this.selectRow(val))
            },
        },
        computed: {
            classes() {
                return {
                    'lv-base-table-hover': !!this.lv_hover,
                    'lv-base-table-stretch': this.lv_stretchTable,
                    'lv-base-table-left-shadow': !this.lv_scrollLeft,
                    'lv-base-table-right-shadow': !this.lv_scrollRight,
                }
            },
            /*
             *  判断左右表格是否应该存在
             *  @author     martsforever
             *  @datetime   2019/1/6 21:52
             */
            lv_fixedExist() {
                const ret = {left: false, center: false, right: false}
                this.columns.forEach(col => Object.keys(ret).forEach(position => !ret[position] && (ret[position] = col.fixed === position)))
                // console.log('==>>', ret)
                return ret
            },
            /*
             *  表头渲染列信息数组
             *  @author     martsforever
             *  @datetime   2019/1/6 21:51
             */
            lv_headColumns() {
                if (!this.lv_mounted) return []
                let maxLevel = 1;
                let columns = this.$plain.$utils.deepCopy(this.columns)

                /*计算最大层数*/
                const calculateLavel = (cols, level) => {
                    if (!!cols && cols.length > 0) {
                        if (level > maxLevel) maxLevel = level
                        cols.forEach((col) => {
                            col.level = level - 1
                            !!col.group && calculateLavel(col.children, level + 1)
                        })
                    }
                }
                /*计算多级表头每个单元格所占行数以及列数*/
                const calculateSpan = (col) => {
                    if (!!col.group) {
                        col.children.forEach(item => calculateSpan(item))
                        col.rowspan = 1
                        col.colspan = 0
                        col.children.forEach(item => col.colspan += item.colspan)
                    } else {
                        col.rowspan = maxLevel - col.level
                        col.colspan = 1
                    }
                }
                calculateLavel(columns, 1)
                columns.forEach(i => calculateSpan(i))
                const headColumns = []
                let i = 0
                while (i < maxLevel) {
                    headColumns.push([])
                    i++
                }
                /*收集多级表头渲染数据*/
                const calculateHeadColumns = (cols) => {
                    if (!!cols && cols.length > 0) {
                        this.$plain.$utils.insertSort(columns, (a, b) => a.order - 0 < b.order);
                        cols.forEach((col) => {
                            headColumns[col.level].push(col)
                            !!col.group && calculateHeadColumns(col.children)
                        })
                    }
                }
                calculateHeadColumns(columns)
                return headColumns
            },
            /*
             *  表体渲染列信息数组
             *  @author     martsforever
             *  @datetime   2019/1/6 21:51
             */
            lv_bodyColumns() {
                if (!this.lv_mounted) return []
                const itar = (columns, ret) => {
                    columns.forEach(item => {
                        if (!!item.group) {
                            itar(item.children, ret)
                        } else {
                            ret.push(item)
                        }
                    })
                }
                const cols = []
                itar(this.columns, cols)
                // console.log(cols.map(i => i.title))
                return cols
            },
            /**
             * 是否需要将table的宽度设置为100%,当列宽总和不足宿主宽度时，设置table宽度为100%
             * @author  韦胜健
             * @date    2019/1/8 19:29
             */
            lv_stretchTable() {
                if (!this.lv_mounted) return false
                const totalWidth = this.lv_bodyColumns.reduce((ret, item) => ret + item.width, 0)
                const hostWidth = this.$el.offsetWidth
                return totalWidth < hostWidth
            },
        },
        created() {
            this.$on('rowEnter', ({row, rowIndex, position}) => this.lv_rowIterate(row => row.lv_hover = true, rowIndex))       //监听行鼠标覆盖行事件
            this.$on('rowLeave', ({row, rowIndex, position}) => this.lv_rowIterate(row => row.lv_hover = false, rowIndex))      //监听行鼠标覆盖行事件
            // this.$on('rowDblClick',({row,rowIndex,position})=>this.lv_rowDblClick({row,rowIndex,position}))                  //监听行鼠标双击行事件
            this.$on('rowClick', this.lv_click)                                                                                 //监听行鼠标单击行事件
            this.$on('scrollLeft', (val) => this.lv_scrollLeft = val)                                                           //内容滑动到左端
            this.$on('scrollRight', (val) => this.lv_scrollRight = val)                                                         //内容滑动到右端
            this.$on('clickTitle', this.lv_clickTitle)                                                                          //点击标题动作
        },
        mounted() {
            this.lv_calculateWidth()
            window.addEventListener('resize', this.lv_calculateWidth)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.lv_calculateWidth)
        },
        methods: {
            /**
             * 开启编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:49
             */
            enableEdit(rowIndex) {
                this.lv_rowIterate(row => row.enableEdit(), rowIndex)
            },
            /**
             * 关闭编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:28
             */
            disableEdit(rowIndex) {
                this.lv_rowIterate(row => row.disableEdit(), rowIndex)
            },
            /**
             * 开始编辑
             * @author  韦胜健
             * @date    2019/1/8 10:28
             */
            startEdit(rowIndex) {
                if (rowIndex != null && rowIndex !== '') {
                    const row = this.data[rowIndex]
                    const editRow = this.lv_editData[rowIndex]
                    Object.keys(row).forEach(key => editRow[key] = row[key])
                } else {
                    this.data.forEach((row, index) => {
                        Object.keys(row).forEach(key => this.lv_editData[index][key] = row[key])
                    })
                }
                this.enableEdit(rowIndex)
            },
            /**
             * 取消编辑，并且将editRow复原
             * @author  韦胜健
             * @date    2019/1/8 10:28
             */
            cancelEdit(rowIndex) {
                if (rowIndex != null && rowIndex !== '') {
                    const row = this.data[rowIndex]
                    const editRow = this.lv_editData[rowIndex]
                    Object.keys(row).forEach(key => editRow[key] = row[key])
                } else {
                    this.data.forEach((row, index) => {
                        Object.keys(row).forEach(key => this.lv_editData[index][key] = row[key])
                    })
                }
                this.disableEdit(rowIndex)
            },
            /**
             * 获取编辑的数据
             * @author  韦胜健
             * @date    2019/1/9 10:41
             */
            getEdit() {
                return this.content.center.rows.reduce((ret, item) => {
                    !!item.lv_editing && ret.push({row: item.row, editRow: item.editRow})
                    return ret
                }, [])
            },
            /**
             * 保存编辑的数据
             * @author  韦胜健
             * @date    2019/1/9 10:41
             */
            saveEdit(results) {
                if (!results || results.length < 1) {
                    console.error('results 不应该为空！')
                    return
                }
                results.forEach(({row, editRow, newRow}) => {
                    Object.keys(newRow).forEach(key => this.$set(editRow, key, newRow[key]))
                    Object.keys(editRow).forEach(key => this.$set(row, key, editRow[key]))
                })
            },
            /**
             * 刷新列
             * @author  韦胜健
             * @date    2019/1/9 16:15
             */
            refreshRender() {
                this.$refs.controller.collect()
            },
            /**
             * 选中行
             * @author  韦胜健
             * @date    2019/1/11 16:37
             */
            selectRow(rowIndex) {
                this.lv_rowIterate((row, index) => row.lv_selected = rowIndex === index)
            },
            /**
             * 校验数据
             * @author  韦胜健
             * @date    2019/1/14 16:54
             */
            validate() {
                /*输入不通过的字段*/
                let inValidField = null;
                /*输入不通过的提示消息*/
                let validateMsg = null;

                this.lv_rowIterate((row) => {
                    if (!row.lv_editing || !!inValidField) return
                    const {flag, validateMsg: msg, field} = row.validate()
                    if (!flag) {
                        inValidField = field
                        validateMsg = msg
                    }
                })
                return {inValidField, validateMsg};
            },
            /*
             *  计算宿主宽度，左右表格的显示宽度应该分别是左右列宽之和，但是里面的head、body的宽度应该为宿主宽度
             *  @author     martsforever
             *  @datetime   2019/1/6 23:09
             */
            lv_calculateWidth() {
                this.lv_hostWidth = this.$el.offsetWidth
            },
            /*
             *  收集列数据信息
             *  @author     martsforever
             *  @datetime   2019/1/6 20:44
             */
            lv_collect(columns) {
                // console.log(columns)
                // console.log(columns.map(item => item.title + item.order));
                this.$plain.$utils.insertSort(columns, (a, b) => a.order - 0 < b.order);
                // console.log(columns.map(item => item.title + item.order));
                this.columns = columns
                this.$emit('collect', columns)
            },
            /*
             *  触发Row组件对象的方法
             *  @author     martsforever
             *  @datetime   2019/1/6 20:55
             */
            lv_rowIterate(fn, index) {
                Object.keys(this.content).forEach(position => {
                    if (this.content[position].rows.length > 0) {
                        if (index != null && index !== '') {
                            if (!!this.content[position].rows[index]) {
                                fn(this.content[position].rows[index])
                            } else {
                                console.error(`row[${position} -- ${index}] is not exist!`)
                            }
                        } else {
                            this.content[position].rows.forEach((row, i) => {
                                fn(row, i)
                            })
                        }
                    }
                })
            },
            /*
             *  收集行组件对象
             *  @author     martsforever
             *  @datetime   2019/1/6 20:46
             */
            lv_rowAdd({row, position}) {
                this.content[position].rows.push(row)
                if (!!this.content[position].timer) {
                    clearTimeout(this.content[position].timer)
                    this.content[position].timer = null
                }
                /*如果rows的长度小于data的长度，表明还有row没有初始化完成，等待10毫秒再对row进行排序*/
                this.content[position].rows.length < this.data.length ? (this.content[position].timer = setTimeout(() => this.lv_sortRows(position), 10)) : this.lv_sortRows(position)
            },
            /*
             *  删除行组件对象
             *  @author     martsforever
             *  @datetime   2019/1/6 20:46
             */
            lv_rowRemove({row, position}) {
                !!this.content[position] && this.$plain.$utils.removeFromArray(this.content[position].rows, row)
            },
            /*
             *  处理行鼠标滑过事件
             *  @author     martsforever
             *  @datetime   2019/1/6 21:00
             */
            lv_rowHover({row, rowIndex, position}) {
                this.lv_hoverIndex != null && (this.lv_rowIterate((row) => row.lv_hover = false, this.lv_hoverIndex))
                this.lv_rowIterate((row) => row.lv_hover = true, rowIndex)
                this.lv_hoverIndex = rowIndex
            },
            /**
             * 根據data中的顺序，对content中的row component进行排序
             * @author  韦胜健
             * @date    2019/1/9 10:32
             */
            lv_sortRows(position) {
                this.content[position].rows.sort((a, b) => this.data.indexOf(a.row) - this.data.indexOf(b.row))
                // console.log(this.content[position].rows.map(item => item.row.left))
            },
            /**
             * 处理点击标题事件
             * @author  韦胜健
             * @date    2019/1/9 14:39
             */
            lv_clickTitle({col}) {
                /*派发排序事件*/
                if (!col.sort) return
                if (!col.children) {
                    if (this.lv_sortField == null) {
                        this.lv_sortField = col.field
                        this.lv_sortDesc = true
                    } else {
                        if (this.lv_sortField === col.field) {
                            if (col.field === this.lv_sortField && !this.lv_sortDesc) {
                                this.lv_sortField = this.sortField
                                this.lv_sortDesc = col.field === this.sortField ? !this.lv_sortDesc : this.sortDesc
                            } else {
                                this.lv_sortDesc = false
                            }
                        } else {
                            this.lv_sortField = col.field
                            this.lv_sortDesc = true
                        }
                    }
                    this.$emit('sortChange', {field: this.lv_sortField, desc: this.lv_sortDesc})
                }
            },
            /**
             * 单击行事件
             * @author  韦胜健
             * @date    2019/1/9 18:05
             */
            lv_click({row, rowIndex}) {
                if (!this.multiSelect) this.lv_rowIterate(row => row.unselect())
                this.lv_rowIterate(row => row.select(), this.selectIndex != null ? this.selectIndex : rowIndex)
            },
        }
    }
</script>

<style lang="scss">
    .lv-base-table {
        width: 100%;
        position: relative;
        border: solid 1px $base-table-border-color;
        * {
            box-sizing: border-box;
        }
        .lv-table-content-left, .lv-table-content-right {
            position: absolute;
            top: 0;
        }
        .lv-table-content-right {
            right: 0;
        }
        .lv-scroll-horizontal-indicator {
            z-index: 1;
        }

        &.lv-base-table-stretch {
            table {
                width: 100%;
            }
        }
        &.lv-base-table-hover {
            .lv-scroll-horizontal-indicator, .lv-scroll-vertical-indicator {
                opacity: 1 !important;
            }
        }

        .lv-table-body-item, .lv-table-head-item {
            @include transition-all;
            box-shadow: 0 0 10px transparent;
        }
        &.lv-base-table-left-shadow {
            .lv-table-body-item-left, .lv-table-head-item-left {
                box-shadow: 0 0 10px rgba(black, 0.12);
            }
        }
        &.lv-base-table-right-shadow {
            .lv-table-body-item-right, .lv-table-head-item-right {
                box-shadow: 0 0 10px rgba(black, 0.12);
            }
        }
    }
</style>