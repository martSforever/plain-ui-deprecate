<template>
    <div class="pl-base-table"
         :class="classes"
         @mouseleave="p_hover=null">
        <pl-table-column-controller @collect="p_collect" ref="controller">
            <slot></slot>
        </pl-table-column-controller>
        <pl-table-head
                v-if="!noHeader"
                ref="head"
                :fixed-exist="p_fixedExist"
                :head-columns="p_headColumns"
                :body-columns="p_bodyColumns"
                :sort-field="p_sortField"
                :sort-desc="p_sortDesc"
                :head-row-height="headRowHeight"
                @mouseenter.native="p_hover = 'head'"
                @scroll="e=>p_hover === 'head' && $refs.body.$refs.center[0].$refs.scroll.setScroll({x: e.target.scrollLeft})"/>
        <pl-table-body
                ref="body"
                :data="data"
                :table-data="p_tableData"
                :body-columns="p_bodyColumns"
                :fixed-exist="p_fixedExist"
                :row-height="rowHeight"
                :row-num="rowNum"
                :default-enable-editable="defaultEnableEditable"
                @mouseenter.native="p_hover = 'body'"
                @scroll="e=>p_hover !== 'head' && !!$refs.head && $refs.head.$refs.scroll.setScroll({x: e.target.scrollLeft})"/>
    </div>
</template>

<script>
    import PlTableColumnController from "./pl-table-column-controller";
    import {MountedMixin} from "../../mixin/component-mixin";
    import {TableMixin} from "./index";
    import PlTableHead from "./pl-table-head";
    import PlTableBody from "./pl-table-body";
    import {deepCopy} from "../../../src/scripts/utils";

    /**
     * 表头行高只能通过css设置，.pl-table-head tr:not(.pl-table-column-space){}
     * @author  韦胜健
     * @date    2019/1/7 15:03
     */
    export default {
        name: "pl-base-table",
        components: {PlTableBody, PlTableHead, PlTableColumnController},
        mixins: [MountedMixin, TableMixin],
        props: {
            multiSelect: {type: Boolean},              //是否多选
            selectIndex: {},
            configColumnFunc: {type: Function},        //配置column的函数
            beforeConfigColumnFunc: {type: Function},  //在配置column之前触发的函数
        },
        data() {
            return {
                columns: [],                           //所有列（去除hide的列）
                originalColumns: [],                   //所有列（原本的列）

                p_hoverIndex: null,                    //鼠标浮动所在的行索引
                p_selectedIndex: [],                   //选中的行索引数组
                p_hostWidth: null,                     //表格显示宽度
                p_hover: null,                         //鼠标是否覆盖在表格上
                p_scrollLeft: false,                   //内容是否滑动到左端
                p_scrollRight: false,                  //内容是否滑动到右端
                p_sortField: this.sortField,           //排序字段
                p_sortDesc: this.sortDesc,             //排序方式，先序降序
                p_tableWidth: null,                    //表格宽度
                p_tableDataCache: [],                  //p_tableData缓存数据
                content: {                             //各个表格的数据对象，rows：pl-table-row组件对象、timer排序定时器
                    left: {rows: [], timer: null},
                    center: {rows: [], timer: null},
                    right: {rows: [], timer: null},
                },
            }
        },
        watch: {
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
                    'pl-base-table-hover': !!this.p_hover,
                    'pl-base-table-left-shadow': !this.p_scrollLeft,
                    'pl-base-table-right-shadow': !this.p_scrollRight,
                }
            },
            /**
             * 表格数据
             * @author  韦胜健
             * @date    2019/3/21 19:14
             */
            p_tableData() {
                const ret = (this.data || []).map(item => {
                    const cacheItem = this.$plain.$utils.findOne(this.p_tableDataCache, (ci) => ci.row === item)
                    if (!!cacheItem) return cacheItem
                    else return {
                        id: this.$plain.$utils.uuid(),
                        row: item,
                        editRow: this.$plain.$utils.deepCopy(item),
                    }
                })
                this.p_tableDataCache = [...ret]
                return ret
            },
            /*
             *  判断左右表格是否应该存在
             *  @author     martsforever
             *  @datetime   2019/1/6 21:52
             */
            p_fixedExist() {
                const ret = {left: false, center: false, right: false}
                this.columns.forEach(col => Object.keys(ret).forEach(position => !ret[position] && (ret[position] = col.fixed === position)))
                return ret
            },
            /*
             *  表头渲染列信息数组
             *  @author     martsforever
             *  @datetime   2019/1/6 21:51
             */
            p_headColumns() {
                if (!this.p_mounted) return []
                let maxLevel = 1;
                let columns = this.p_copyColumns(this.columns)

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
            p_bodyColumns() {
                if (!this.p_mounted) return []
                if (!this.p_tableWidth) return []
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
                /*收集渲染的列*/
                itar(this.columns, cols)
                /*首次加载还没有挂载mounted的时候，columns应该是空的，收集的bodyColumns也是空的，直接返回空数组*/
                if (cols.length === 0) return cols
                /*计算所有列的总宽度*/
                const totalColumnWidth = cols.reduce((ret, item) => ret + item.width, 0)
                /*如果所有列的总宽度小于表格宽度，按照列的权重给列分配剩下的宽度*/
                if (totalColumnWidth < this.p_tableWidth) {
                    /*额外多出来的宽度*/
                    let externalWidth = this.p_tableWidth - totalColumnWidth
                    /*总权重*/
                    let totalColumnFit = cols.reduce((ret, item) => ret + item.fit, 0)
                    /*如果列中没有配置权重，则最后一个非固定列设置权重为1*/
                    if (totalColumnFit === 0) {
                        for (let i = cols.length - 1; i >= 0; i--) {
                            const col = cols[i]
                            if (col.fixed !== 'left' && col.fixed !== 'right') {
                                col.fit = 1
                                break
                            }
                        }
                        totalColumnFit = 1
                    }
                    /*一份权重所增加的宽度*/
                    let externalChunkWidth = Math.floor(externalWidth / totalColumnFit) - 1
                    cols.forEach(col => col.width = (col.width + Math.floor(col.fit * externalChunkWidth)))
                }
                return cols
            },
        },
        created() {
            this.$on('rowEnter', ({row, rowIndex, position}) => this.p_rowIterate(row => row.p_hover = true, rowIndex))       //监听行鼠标覆盖行事件
            this.$on('rowLeave', ({row, rowIndex, position}) => this.p_rowIterate(row => row.p_hover = false, rowIndex))      //监听行鼠标覆盖行事件
            // this.$on('rowDblClick',({row,rowIndex,position})=>this.p_rowDblClick({row,rowIndex,position}))                  //监听行鼠标双击行事件
            this.$on('rowClick', this.p_click)                                                                                 //监听行鼠标单击行事件
            this.$on('scrollLeft', (val) => this.p_scrollLeft = val)                                                           //内容滑动到左端
            this.$on('scrollRight', (val) => this.p_scrollRight = val)                                                         //内容滑动到右端
            this.$on('clickTitle', this.p_clickTitle)                                                                          //点击标题动作
        },
        async mounted() {
            this.p_calculateWidth()
            window.addEventListener('resize', this.p_calculateWidth)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.p_calculateWidth)
        },
        methods: {
            /**
             * 开启编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:49
             */
            enableEdit(rowIndex) {
                this.p_rowIterate(row => row.enableEdit(), rowIndex)
            },
            /**
             * 关闭编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:28
             */
            disableEdit(rowIndex) {
                this.p_rowIterate(row => row.disableEdit(), rowIndex)
            },
            /**
             * 开始编辑
             * @author  韦胜健
             * @date    2019/1/8 10:28
             */
            startEdit(rowIndex) {
                if (rowIndex != null && rowIndex !== '') {
                    const {row, editRow} = this.p_tableData[rowIndex]
                    Object.keys(row).forEach(key => editRow[key] = row[key])
                } else {
                    this.p_tableData.forEach(item => {
                        const {row, editRow} = item
                        Object.keys(row).forEach(key => editRow[key] = row[key])
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
                    const {row, editRow} = this.p_tableData[rowIndex]
                    Object.keys(row).forEach(key => editRow[key] = row[key])
                } else {
                    this.p_tableData.forEach(item => {
                        const {row, editRow} = item
                        Object.keys(row).forEach(key => editRow[key] = row[key])
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
                    !!item.p_editing && ret.push({row: item.row, editRow: item.editRow})
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
                this.p_rowIterate((row, index) => row.p_selected = rowIndex === index)
            },
            /**
             * 校验数据
             * @author  韦胜健
             * @date    2019/1/14 16:54
             */
            validate() {
                let ret = {flag: true, validateMsg: null, field: null, col: null}
                this.p_rowIterate((row) => {
                    if (!row.p_editing || !ret.flag) return
                    const {flag, validateMsg, field, col} = row.validate()
                    if (!flag) ret = {flag, validateMsg, field, col}
                })
                return ret
            },
            /*
             *  计算宿主宽度，左右表格的显示宽度应该分别是左右列宽之和，但是里面的head、body的宽度应该为宿主宽度
             *  @author     martsforever
             *  @datetime   2019/1/6 23:09
             */
            p_calculateWidth() {
                this.p_hostWidth = this.$el.offsetWidth
            },
            /*
             *  收集列数据信息
             *  @author     martsforever
             *  @datetime   2019/1/6 20:44
             */
            async p_collect(columns) {
                /*等待属性变化完成*/
                await this.$plain.nextTick()
                /*保存原本的列信息*/
                this.originalColumns = this.p_copyColumns(columns)
                !!this.beforeConfigColumnFunc && this.beforeConfigColumnFunc(columns, this.p_colIterate)
                /*配置列*/
                this.p_colIterate(columns, (col, isGroup, cols) => {
                    if (col.disabledConfig) return
                    !!this.configColumnFunc && this.configColumnFunc(col, isGroup, cols)
                    if (isGroup) return
                    if (col.hide) {
                        cols.splice(cols.indexOf(col), 1)
                        return 1
                    }
                })

                /*---------------------------------------排序-------------------------------------------*/
                function orderFunc(a, b) {
                    const aOrder = a.order + (a.fixed === 'left' ? 999 : a.fixed === 'right' ? -999 : 0)
                    const bOrder = b.order + (b.fixed === 'left' ? 999 : b.fixed === 'right' ? -999 : 0)
                    return aOrder < bOrder
                }

                /*递归遍历子节点，如果是多级表头，则对子列进行插入排序*/
                this.p_colIterate(columns, (col, isGroup) => {
                    if (isGroup && !!col.children && col.children.length > 0) {
                        col.children.forEach(item => item.fixed = col.fixed)
                        this.$plain.$utils.insertSort(col.children, orderFunc)
                    }
                })
                /*对最外层列或者列组进行插入排序*/
                this.$plain.$utils.insertSort(columns, orderFunc);

                this.columns = columns
                this.$emit('collect', columns)
                await this.$plain.nextTick()
                await this.$plain.nextTick()
                this.p_tableWidth = this.$refs.body.$el.offsetWidth
            },
            /**
             * 复制columns
             * @author  韦胜健
             * @date    2019/2/20 16:13
             */
            p_copyColumns(columns) {
                const ret = []
                if (!columns || columns.length === 0) return ret
                for (let i = 0; i < columns.length; i++) {
                    const col = columns[i];
                    if (col.group) col.children = this.p_copyColumns(col.children)
                    ret.push(col)
                }
                return ret
            },
            /**
             * 递归遍历所有列以及列组
             * @author  韦胜健
             * @date    2019/2/20 09:45
             */
            p_colIterate(columns, fn) {
                if (!columns || columns.length === 0) return
                else {
                    for (let i = 0; i < columns.length; i++) {
                        const col = columns[i];
                        i -= (fn(col, !!col.group, columns) || 0)
                        if (!!col.group) this.p_colIterate(col.children, fn)
                    }
                }
            },
            /*
             *  触发Row组件对象的方法
             *  @author     martsforever
             *  @datetime   2019/1/6 20:55
             */
            p_rowIterate(fn, index) {
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
            p_rowAdd({row, position}) {
                this.content[position].rows.push(row)
                if (!!this.content[position].timer) {
                    clearTimeout(this.content[position].timer)
                    this.content[position].timer = null
                }
                /*如果rows的长度小于data的长度，表明还有row没有初始化完成，等待10毫秒再对row进行排序*/
                this.content[position].rows.length < this.data.length ? (this.content[position].timer = setTimeout(() => this.p_sortRows(position), 10)) : this.p_sortRows(position)
            },
            /*
             *  删除行组件对象
             *  @author     martsforever
             *  @datetime   2019/1/6 20:46
             */
            p_rowRemove({row, position}) {
                !!this.content[position] && this.$plain.$utils.removeFromArray(this.content[position].rows, row)
            },
            /*
             *  处理行鼠标滑过事件
             *  @author     martsforever
             *  @datetime   2019/1/6 21:00
             */
            p_rowHover({row, rowIndex, position}) {
                this.p_hoverIndex != null && (this.p_rowIterate((row) => row.p_hover = false, this.p_hoverIndex))
                this.p_rowIterate((row) => row.p_hover = true, rowIndex)
                this.p_hoverIndex = rowIndex
            },
            /**
             * 根據data中的顺序，对content中的row component进行排序
             * @author  韦胜健
             * @date    2019/1/9 10:32
             */
            p_sortRows(position) {
                this.content[position].rows.sort((a, b) => this.data.indexOf(a.row) - this.data.indexOf(b.row))
            },
            /**
             * 处理点击标题事件
             * @author  韦胜健
             * @date    2019/1/9 14:39
             */
            p_clickTitle({col}) {
                /*派发排序事件*/
                if (!col.sort) return
                if (!col.children) {
                    if (this.p_sortField == null) {
                        this.p_sortField = col.field
                        this.p_sortDesc = true
                    } else {
                        if (this.p_sortField === col.field) {
                            if (col.field === this.p_sortField && !this.p_sortDesc) {
                                this.p_sortField = this.sortField
                                this.p_sortDesc = col.field === this.sortField ? !this.p_sortDesc : this.sortDesc
                            } else {
                                this.p_sortDesc = false
                            }
                        } else {
                            this.p_sortField = col.field
                            this.p_sortDesc = true
                        }
                    }
                    this.$emit('sortChange', {field: this.p_sortField, desc: this.p_sortDesc})
                }
            },
            /**
             * 单击行事件
             * @author  韦胜健
             * @date    2019/1/9 18:05
             */
            p_click({row, rowIndex}) {
                if (!this.multiSelect) this.p_rowIterate(row => row.unselect())
                this.p_rowIterate(row => row.select(), this.selectIndex != null ? this.selectIndex : rowIndex)
            },
        }
    }
</script>