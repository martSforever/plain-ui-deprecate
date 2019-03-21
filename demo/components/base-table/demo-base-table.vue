<template>
    <div class="demo-basic-table">
        <demo-row title="操作按钮">
            <demo-row-item width="0">
                <link-button label="查看columns" @click="checkColumns"/>
                <link-button label="添加数据" @click="push"/>
                <link-button label="删除数据" @click="pop"/>
                <link-button label="查看配置信息" @click="logContent"/>
            </demo-row-item>
            <demo-row-item width="0">
                <link-button @click="enableEdit">开启编辑状态</link-button>
                <link-button @click="disableEdit">关闭编辑状态</link-button>
                <link-button @click="startEdit">开始编辑</link-button>
                <link-button @click="cancelEdit">取消编辑</link-button>
                <link-number v-model="targetIndex" placeholder="目标行索引"/>
            </demo-row-item>
            <demo-row-item width="0">
                <link-button @click="add" label="添加"/>
                <link-button @click="cancel" label="取消"/>
                <link-button @click="save" label="保存"/>
            </demo-row-item>
            <demo-row-item width="0">
                <link-button label="状态：" box-type="line"/>
                <link-button v-for="(item,index) in Object.keys(EDIT_STATUS)" :label="item" :active="EDIT_STATUS[item] === status" :key="index"/>
            </demo-row-item>
            <demo-row-item width="0">
                <link-radio v-model="multiInsert" label="批量新建"/>
                <link-radio v-model="multiUpdate" label="批量更新"/>
            </demo-row-item>
            <demo-row-item width="0">
                <link-button :label="`sortField:${sortField}`" box-type="line"/>
                <link-button :label="`sortDesc:${sortDesc}`" :active="sortDesc"/>
            </demo-row-item>
            <demo-row-item width="0">
                <link-radio v-model="multiSelect" label="多选"/>
            </demo-row-item>
        </demo-row>
        <pl-base-table :data="data"
                       ref="baseTable"
                       sort-field="trainno"
                       :sort-desc="true"
                       :multi-select="multiSelect"
                       @rowClick="rowClick"
                       @rowDblClick="rowDblClick"
                       @sortChange="sortChange">

            <link-tc-column title="车次" field="trainno"/>
            <link-tc-column title="车次" field="trainno"/>
            <link-tc-input title="车次,input" field="trainno" box-shape="round"/>
            <link-tc-input title="车次,input" field="trainno" box-shape="round">
                <template slot-scope="{showRow,rowIndex,prop}">
                    {{rowIndex}}、{{showRow.trainno}}、【{{prop.boxShape}}】
                </template>
            </link-tc-input>
            <link-tc-column title="车次,column custom" field="trainno" align="right">
                <template slot="head" slot-scope="{col}">
                    T-{{col.title}}
                </template>
                <template slot-scope="{showRow,rowIndex}">
                    {{rowIndex}}、{{showRow.trainno}}
                </template>
                <template slot="edit" slot-scope="{editRow,rowIndex}">
                    <link-radio v-model="editRow.trainno" true-value="Y" false-value="N"/>
                </template>
            </link-tc-column>
            <!--<link-tc-column title="车次" field="trainno">
                <template slot="head" slot-scope="{col}">
                    T-{{col.title}}
                </template>
                <template slot-scope="{showRow,rowIndex}">
                    {{rowIndex}}、{{showRow.trainno}}
                </template>
                <template slot="edit" slot-scope="{editRow,rowIndex}">
                    <link-radio v-model="editRow.trainno" true-value="Y" false-value="N"/>
                </template>
            </link-tc-column>
            <link-tc-column title="车次" field="trainno" :editable="false"/>
            <link-tc-column title="类型" field="type"/>-->
            <!--link-tc-column-group title="车次信息">
                link-tc-column title="车次" field="trainno"/>
                link-tc-column title="类型" field="type"/>
                link-tc-column-group title="站点信息">
                    link-tc-column title="出发站" field="station"/>
                    link-tc-column title="到达站" field="endstation"/>
                </pl-base-table-column-group>
                link-tc-column-group titile="时间范围">
                    link-tc-column title="出发时间" field="departuretime"/>
                    link-tc-column title="到达时间" field="arrivaltime"/>
                </pl-base-table-column-group>
            </pl-base-table-column-group>
            link-tc-column title="顺序" field="sequenceno"/>
            link-tc-column title="用时" field="costtime"/>
            link-tc-column title="距离" field="distance"/>
            link-tc-column title="是否终点" field="isend"/>
            link-tc-column title="商务座票价" field="pricesw"/>
            link-tc-column title="特等座票价" field="pricetd"/>
            link-tc-column title="高级软卧上票价" field="pricegr1"/>
            link-tc-column title="高级软卧下票价" field="pricegr2"/>

            link-tc-column title="软卧上票价" field="pricerw1"/>
            link-tc-column title="软卧下票价" field="pricerw2"/>-->
        </pl-base-table>
    </div>
</template>

<script>

    import {TableData} from "../../data";
    import PlBaseTable from "../../../src/components/base-table/pl-base-table";
    import PlBaseTableColumn from "../../../src/components/base-table/pl-base-table-column";
    import PlBaseTableColumnGroup from "../../../src/components/base-table/pl-base-table-column-group";

    export default {
        name: "demo-basic-table",
        components: {PlBaseTableColumnGroup, PlBaseTableColumn, PlBaseTable},
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

                data: TableData
            }
        },
        mounted() {
            this.baseTable = this.$refs.baseTable
        },
        methods: {
            checkColumns() {
            },
            push() {
                console.log(this.data[15])
                this.data.unshift(this.data[15])
            },
            pop() {
                this.data.shift()
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
                // console.log('rowClick', rowIndex)
            },
            /**
             * 监听行双击事件
             * @author  韦胜健
             * @date    2019/1/9 11:13
             */
            rowDblClick({row, rowIndex, position}) {
                this.checkStatus({
                    update() {
                        if (this.multiUpdate && !row.p_editing) this.baseTable.enableEdit(rowIndex)
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
                    this.data.unshift(newRow)
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
                        this.data.splice(0, this.newData.length)
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