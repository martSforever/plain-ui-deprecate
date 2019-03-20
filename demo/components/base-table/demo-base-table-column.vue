<template>
    <div class="demo-base-table-column">
        <!--<demo-row title="基本列">
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
        </demo-row>-->

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
    </div>
</template>

<script>
    import {SimpleTableData} from "../../data";
    import PlBaseTable from "../../../src/components/base-table/pl-base-table";

    export default {
        name: "demo-base-table-column",
        components: {PlBaseTable},
        data() {
            return {
                data: SimpleTableData
            }
        },
    }
</script>

<style lang="scss">

</style>