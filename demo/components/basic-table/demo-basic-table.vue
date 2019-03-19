<template>
    <div class="demo-basic-table">
        <pl-basic-table :data="data">
            <pl-basic-table-column-group title="车次信息">
                <pl-basic-table-column title="车次" field="trainno"/>
                <pl-basic-table-column title="类型" field="type"/>
                <pl-basic-table-column-group title="站点信息">
                    <pl-basic-table-column title="出发站" field="station"/>
                    <pl-basic-table-column title="到达站" field="endstation"/>
                </pl-basic-table-column-group>
                <pl-basic-table-column-group titile="时间范围">
                    <pl-basic-table-column title="出发时间" field="departuretime"/>
                    <pl-basic-table-column title="到达时间" field="arrivaltime"/>
                </pl-basic-table-column-group>
            </pl-basic-table-column-group>
            <pl-basic-table-column title="顺序" field="sequenceno"/>
            <pl-basic-table-column title="用时" field="costtime"/>
            <pl-basic-table-column title="距离" field="distance"/>
            <pl-basic-table-column title="是否终点" field="isend"/>
            <pl-basic-table-column title="商务座票价" field="pricesw"/>
            <pl-basic-table-column title="特等座票价" field="pricetd"/>
            <pl-basic-table-column title="高级软卧上票价" field="pricegr1"/>
            <pl-basic-table-column title="高级软卧下票价" field="pricegr2"/>
            <pl-basic-table-column title="软卧上票价" field="pricerw1"/>
            <pl-basic-table-column title="软卧下票价" field="pricerw2"/>
        </pl-basic-table>
    </div>
</template>

<script>
    import PlBasicTable from "../../../src/components/basic-table/pl-basic-table";
    import PlBasicTableColumn from "../../../src/components/basic-table/pl-basic-table-column";

    import {TableData} from "../../data";
    import PlBasicTableColumnGroup from "../../../src/components/basic-table/pl-basic-table-column-group";

    export default {
        name: "demo-basic-table",
        components: {PlBasicTableColumnGroup, PlBasicTableColumn, PlBasicTable},
        data() {
            return {
                data: TableData
            }
        },
    }
</script>

<style lang="scss">

</style>