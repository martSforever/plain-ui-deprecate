<template>
    <div class="demo-base-table-edit">
        <demo-row>
            <demo-row-item>
                <link-button-group>
                    <link-button label="状态：" box-type="line"/>
                    <link-button v-for="(item,index) in Object.keys(EDIT_STATUS)" :label="item" :active="EDIT_STATUS[item] === status" :key="index"/>
                </link-button-group>
            </demo-row-item>
            <demo-row-item>
                <link-button @click="add" label="添加"/>
                <link-button @click="cancel" label="取消"/>
                <link-button @click="save" label="保存"/>
            </demo-row-item>
            <link-base-table :data="list" :rowNum="5" @rowDblClick="rowDblClick" ref="baseTable">
                <link-column field="trainno" title="车次"/>
                <link-column-input title="顺序" field="sequenceno"/>
                <link-column-input title="用时" field="costtime"/>
                <link-column-input title="距离" field="distance"/>
                <link-column-input title="是否终点" field="isend"/>
            </link-base-table>
        </demo-row>
    </div>
</template>

<script>
    import {SimpleTableData, TableData} from "../../data";

    export default {
        name: "demo-base-table-edit",
        data() {
            return {
                list: SimpleTableData,
                tableData: TableData,

                EDIT_STATUS: {
                    INSERT: 'insert',
                    UPDATE: 'update',
                    NORMAL: 'normal'
                },
                status: 'normal',
                newData:[],
            }
        },
        mounted() {
            this.baseTable = this.$refs.baseTable
        },
        methods: {
            /**
             * 模拟新建动作
             * @author  韦胜健
             * @date    2019/1/9 11:13
             */
            add() {
                const addNew = () => {
                    const newRow = this.$plain.$utils.deepCopy(this.tableData[this.list.length + 10])
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
        }
    }
</script>

<style lang="scss">

</style>