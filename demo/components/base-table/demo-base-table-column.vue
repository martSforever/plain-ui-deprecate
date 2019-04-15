<template>
    <div class="demo-base-table-column">
        <demo-row title="基本列">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="车次" field="trainno"/>
                <link-tc-column title="类型" field="type"/>
                <link-tc-column title="用时" field="costtime"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="自定义宽度">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="车次,300px" field="trainno" width="300px"/>
                <link-tc-column title="类型,200px" field="type" width="200px"/>
                <link-tc-column title="用时,150px" field="costtime" width="150px"/>
                <link-tc-column title="用时" field="costtime"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="列宽权重：fit当列不满表格宽度时，该列所占剩下宽度的权重">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="车次" field="trainno"/>
                <link-tc-column title="类型,fit=1" field="type" :fit="1"/>
                <link-tc-column title="用时,fit=1" field="costtime" :fit="1"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="列排序">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="车次,order=1" field="trainno" :order="1"/>
                <link-tc-column title="类型,order=2" field="type" :order="2"/>
                <link-tc-column title="用时,order=3" field="costtime" :order="3"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="固定列">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="类型" field="type"/>
                <link-tc-column title="车次,fixed=left" field="trainno" fixed="left"/>
                <link-tc-column title="车次,fixed=right" field="trainno" fixed="right"/>
                <link-tc-column title="用时" field="costtime"/>
                <link-tc-column title="出发站" field="station"/>
                <link-tc-column title="到达站" field="endstation"/>
                <link-tc-column title="出发时间" field="departuretime"/>
                <link-tc-column title="到达时间" field="arrivaltime"/>
                <link-tc-column title="顺序" field="sequenceno"/>
                <link-tc-column title="用时" field="costtime"/>
                <link-tc-column title="距离" field="distance"/>
                <link-tc-column title="是否终点" field="isend"/>
                <link-tc-column title="商务座票价" field="pricesw"/>
                <link-tc-column title="特等座票价" field="pricetd"/>
                <link-tc-column title="高级软卧上票价" field="pricegr1"/>
                <link-tc-column title="高级软卧下票价" field="pricegr2"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="自定义左固定以及自动右固定">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="类型" field="type"/>
                <link-tc-column title="车次,fixed=left" field="trainno" fixed="left"/>
                <link-tc-column title="车次,fixed=right" field="trainno" fixed="right"/>
                <link-tc-column title="用时,placeLeft" field="costtime" placeLeft/>
                <link-tc-column title="出发站,placeRight" field="station" placeRight/>
                <link-tc-column title="到达站" field="endstation"/>
                <link-tc-column title="出发时间" field="departuretime"/>
                <link-tc-column title="到达时间" field="arrivaltime"/>
                <link-tc-column title="顺序" field="sequenceno"/>
                <link-tc-column title="用时" field="costtime"/>
                <link-tc-column title="距离" field="distance"/>
                <link-tc-column title="是否终点" field="isend"/>
                <link-tc-column title="商务座票价" field="pricesw"/>
                <link-tc-column title="特等座票价" field="pricetd"/>
                <link-tc-column title="高级软卧上票价" field="pricegr1"/>
                <link-tc-column title="高级软卧下票价" field="pricegr2"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="隐藏列">
            <demo-row-item>
                <link-toggle v-model="val[0]"/>
            </demo-row-item>
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="车次" field="trainno"/>
                <link-tc-column title="类型" field="type"/>
                <link-tc-column title="用时,hide" field="costtime" :hide="val[0]"/>
                <link-tc-column title="出发站" field="station"/>
                <link-tc-column title="到达站" field="endstation"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="对其方式">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="车次,align=right" field="trainno" align="right"/>
                <link-tc-column title="类型,align=left" field="type" align="left"/>
                <link-tc-column title="用时,align=center" field="costtime" align="center"/>
                <link-tc-column title="车次,align=right" field="trainno" align="right">
                    <template slot-scope="{showRow,rowIndex}">
                        {{rowIndex}}、{{showRow.trainno}}
                    </template>
                    <template slot="head" slot-scope="{col}">
                        T-{{col.title}}
                    </template>
                    <template slot="edit" slot-scope="{editRow,rowIndex}">
                        <link-radio v-model="editRow.trainno" true-value="Y" false-value="N"/>
                    </template>
                </link-tc-column>
            </pl-base-table>
        </demo-row>

        <demo-row title="默认排序字段以及排序方式">
            <pl-base-table :data="data" :row-num="data.length" sort-field="type" sort-desc>
                <link-tc-column title="车次" field="trainno"/>
                <link-tc-column title="类型" field="type"/>
                <link-tc-column title="用时" field="costtime"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="不可排序">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="车次,sort=false" field="trainno" :sort="false"/>
                <link-tc-column title="类型" field="type"/>
                <link-tc-column title="用时" field="costtime"/>
            </pl-base-table>
        </demo-row>

        <demo-row title="数据快速格式化">
            <pl-base-table :data="data" :row-num="data.length">
                <link-tc-column title="车次,sort=false" field="trainno"/>
                <link-tc-column title="类型" field="type"/>
                <link-tc-column title="dataType=tel" field="number" dataType="tel"/>
                <link-tc-column title="dataType=cny" field="number" dataType="cny"/>
                <link-tc-column title="dataType=money" field="number" dataType="money"/>
                <link-tc-column title="dataType=percent" field="number" dataType="percent"/>
                <link-tc-column title="用时" field="costtime"/>
            </pl-base-table>
        </demo-row>

    </div>
</template>

<script>
    import {SimpleTableData} from "../../data";
    import PlBaseTable from "../../../src-bak/components/base-table/pl-base-table";

    export default {
        name: "demo-base-table-column",
        components: {PlBaseTable},
        data() {
            const data = this.$plain.$utils.deepCopy(SimpleTableData)
            data.forEach(item => item.number = new Date().getTime())
            return {
                data,
                val: {
                    0: true
                }
            }
        },
    }
</script>

<style lang="scss">

</style>