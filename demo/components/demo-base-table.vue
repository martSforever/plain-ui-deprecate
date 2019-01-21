<template>
    <div class="demo-base-table">
        <demo-row title="操作按钮">
            <link-button-group>
                <link-button label="查看columns" @click="checkColumns"/>
                <link-button label="添加数据" @click="push"/>
                <link-button label="删除数据" @click="pop"/>
                <link-button label="查看配置信息" @click="logContent"/>
            </link-button-group>
            <link-button-group>
                <link-button @click="enableEdit">开启编辑状态</link-button>
                <link-button @click="disableEdit">关闭编辑状态</link-button>
                <link-button @click="startEdit">开始编辑</link-button>
                <link-button @click="cancelEdit">取消编辑</link-button>
            </link-button-group>
            <link-number v-model="targetIndex" placeholder="目标行索引"/>
            <link-button-group>
                <link-button @click="add" label="添加"/>
                <link-button @click="cancel" label="取消"/>
                <link-button @click="save" label="保存"/>
            </link-button-group>
            <link-button-group>
                <link-button label="状态：" box-type="line"/>
                <link-button v-for="(item,index) in Object.keys(EDIT_STATUS)" :label="item" :active="EDIT_STATUS[item] === status" :key="index"/>
            </link-button-group>

            <link-radio v-model="multiInsert" label="批量新建"/>
            <link-radio v-model="multiUpdate" label="批量更新"/>

            <link-button-group>
                <link-button :label="`sortField:${sortField}`" box-type="line"/>
                <link-button :label="`sortDesc:${sortDesc}`" :active="sortDesc"/>
            </link-button-group>

            <link-radio v-model="multiSelect" label="多选"/>
        </demo-row>

        <demo-row title="测试固定列位置" v-if="true">
            <link-base-table :data="list"
                             ref="baseTable"
                             :row-num="5"
                             sort-field="left1"
                             :sort-desc="true"
                             :multi-select="multiSelect"
                             @rowClick="rowClick"
                             @rowDblClick="rowDblClick"
                             @sortChange="sortChange"
            >
                <link-column-index v-if="indexing"/>
                <link-column-group title="右大组" fixed="right">
                    <link-column-input field="right" title="右" fixed="right"/>
                    <link-column-group title="右组" fixed="right">
                        <link-column-input field="right1" title="右1"/>
                        <link-column-input field="right2" title="右2"/>
                    </link-column-group>
                </link-column-group>

                <link-column-group title="左大组" fixed="left">
                    <link-column-group title="左组" fixed="left">
                        <link-column-input field="left1" title="左1" align="right" data-type="tel" tooltip :requiredFunc="requiredFunc"/>
                        <link-column field="left1" title="左1" @click="log">
                            <template slot-scope="{row,rowIndex}">
                                普同行自定义内容:{{rowIndex}}、{{row.left1}}
                            </template>
                        </link-column>
                        <link-column-input field="left2" title="左2" @click="log">
                            <template slot-scope="{row,rowIndex}">
                                输入航自定义内容:{{rowIndex}}、{{row.left1}}
                            </template>
                        </link-column-input>
                    </link-column-group>
                    <link-column-input field="left" title="左" fixed="left"/>
                </link-column-group>

                <link-column-group title="中组">
                    <link-column-input field="center1" title="中1"/>
                    <link-column-input field="center2" title="中2"/>
                    <link-column-input field="center2" title="中2"/>
                    <link-column-input field="center2" title="中2"/>
                    <link-column-input field="center2" title="中2"/>
                    <link-column-input field="center2" title="中2"/>
                    <link-column-input field="center2" title="中2"/>
                    <link-column-input field="center2" title="中2"/>
                    <link-column-input field="center2" title="中2"/>
                    <link-column-input field="center2" title="中2"/>

                </link-column-group>
                <link-column-input field="center" title="中"/>
            </link-base-table>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-base-table",
        data() {
            return {
                EDIT_STATUS: {
                    INSERT: 'insert',
                    UPDATE: 'update',
                    NORMAL: 'normal'
                },
                status: 'normal',
                indexing: true,
                multiInsert: true,
                multiUpdate: true,
                multiSelect: false,
                sortDesc: true,
                sortField: 'left1',

                newData: [],
                targetIndex: null,
                list: [
                    {right: 1, right1: 2, right2: 3, left: '444start', left1: 0.10, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 13924569321, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 213.132, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 2333.3333, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: '444middle', left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: 4, left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                    {right: 1, right1: 2, right2: 3, left: '444end', left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9},
                ],
            }
        },
        mounted() {
            this.baseTable = this.$refs.baseTable
        },
        methods: {
            checkColumns() {
            },
            push() {
                this.list.unshift({right: 1, right1: 2, right2: 3, left: 4, left1: 21321312, left2: 6, center: 7, center1: 8, center2: 9})
            },
            pop() {
                this.list.shift()
            },
            logContent() {
                console.log(this.baseTable.content)
            },

            enableEdit() {
                this.baseTable.enableEdit(this.targetIndex)
            },
            disableEdit() {
                this.baseTable.disableEdit(this.targetIndex)
            },
            startEdit() {
                this.baseTable.startEdit(this.targetIndex)
            },
            cancelEdit() {
                this.baseTable.cancelEdit(this.targetIndex)
            },

            /**
             * 处理排序变化事件
             * @author  韦胜健
             * @date    2019/1/9 15:04
             */
            sortChange({field, desc}) {
                this.sortField = field || 'created'
                this.sortDesc = !!field ? desc : true
            },
            /**
             * 工具函数，判断当前状态
             * @author  韦胜健
             * @date    2019/1/9 11:12
             */
            checkStatus({insert, update, normal, final}) {
                switch (this.status) {
                    case this.EDIT_STATUS.NORMAL:
                        !!normal && normal.apply(this)
                        break;
                    case this.EDIT_STATUS.INSERT:
                        !!insert && insert.apply(this)
                        break;
                    case this.EDIT_STATUS.UPDATE:
                        !!update && update.apply(this)
                        break;
                }
                !!final && final.apply(this)
            },
            /**
             * 监听行单击事件
             * @author  韦胜健
             * @date    2019/1/9 11:13
             */
            rowClick({row, rowIndex, position}) {
                console.log(rowIndex)
            },
            /**
             * 监听行双击事件
             * @author  韦胜健
             * @date    2019/1/9 11:13
             */
            rowDblClick({row, rowIndex, position}) {
                this.checkStatus({
                    update() {
                        if (this.multiUpdate && !row.lv_editing) this.baseTable.enableEdit(rowIndex)
                    },
                    normal() {
                        this.baseTable.enableEdit(rowIndex)
                        this.status = this.EDIT_STATUS.UPDATE
                    },
                })
            },
            /**
             * 模拟新建动作
             * @author  韦胜健
             * @date    2019/1/9 11:13
             */
            add() {
                const addNew = () => {
                    const newRow = {right: 1, right1: 2, right2: 3, left: this.$plain.$utils.uuid(), left1: 5, left2: 6, center: 7, center1: 8, center2: 9}
                    this.newData.push(newRow)
                    this.list.unshift(newRow)
                    this.$nextTick(() => this.baseTable.enableEdit(0))
                    this.status = this.EDIT_STATUS.INSERT
                }
                this.checkStatus({
                    insert() {
                        this.multiInsert && addNew()
                    },
                    normal() {
                        addNew()
                    },
                })
            },
            /**
             * 模拟取消dongzuo
             * @author  韦胜健
             * @date    2019/1/9 11:13
             */
            cancel() {
                this.checkStatus({
                    insert() {
                        this.list.splice(0, this.newData.length)
                        this.newData.splice(0, this.newData.length)
                    },
                    update() {
                        this.baseTable.cancelEdit()
                    },
                    final() {
                        this.status = this.EDIT_STATUS.NORMAL
                    },
                })
            },
            /**
             * 模拟保存动作
             * @author  韦胜健
             * @date    2019/1/9 11:14
             */
            save() {
                const editData = this.baseTable.getEdit()
                this.checkStatus({
                    insert() {
                        if (this.multiInsert) this.saveRows({editData})
                        else this.saveRow({editData})
                        this.newData.splice(0, this.newData.length)
                        this.baseTable.disableEdit()
                    },
                    update() {
                        if (this.multiUpdate) this.saveRows({editData})
                        else this.saveRow({editData})
                        this.baseTable.disableEdit()
                    },
                    final() {
                        this.status = this.EDIT_STATUS.NORMAL
                    },
                })
            },

            /**
             * 无论是新建还是编辑，保存单条数据动作
             * @author  韦胜健
             * @date    2019/1/9 11:16
             */
            saveRow({editData}) {
                const {row, editRow} = editData[0]
                const newRow = this.requestSaveRow(editRow)
                this.baseTable.saveEdit([{row, editRow, newRow}])
            },
            /**
             * 无论是新建还是编辑，保存多条数据动作
             * @author  韦胜健
             * @date    2019/1/9 11:17
             */
            saveRows({editData}) {
                const editRows = editData.map(item => item.editRow)
                const newRows = this.requestSaveRows(editRows)
                this.baseTable.saveEdit(editData.map(({row, editRow}, index) => ({row, editRow, newRow: newRows[index]})))
            },

            /**
             * 模拟请求保存单条数据
             * @author  韦胜健
             * @date    2019/1/9 11:14
             */
            requestSaveRow(row) {
                const newRow = this.$plain.$utils.deepCopy(row)
                newRow.left1 = this.$plain.$utils.uuid()
                return newRow
            },
            /**
             * 模拟保存多条数据
             * @author  韦胜健
             * @date    2019/1/9 11:14
             */
            requestSaveRows(rows) {
                return rows.reduce((ret, item) => {
                    const newRow = this.$plain.$utils.deepCopy(item)
                    newRow.left1 = this.$plain.$utils.uuid()
                    ret.push(newRow)
                    return ret
                }, [])
            },

            requiredFunc({row, rowIndex, editRow}) {
                console.log('valid', editRow.left == '4')
                return editRow.left2 == '4'
            },
        },
    }
</script>

<style lang="scss">

</style>