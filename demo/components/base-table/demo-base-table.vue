<template>
    <div class="demo-basic-table">
        <pl-base-table :data="data">
            <pl-base-table-column title="车次" field="trainno"/>
            <pl-base-table-column title="类型" field="type"/>

            <!--<pl-base-table-column-group title="车次信息">
                <pl-base-table-column title="车次" field="trainno"/>
                <pl-base-table-column title="类型" field="type"/>
                <pl-base-table-column-group title="站点信息">
                    <pl-base-table-column title="出发站" field="station"/>
                    <pl-base-table-column title="到达站" field="endstation"/>
                </pl-base-table-column-group>
                <pl-base-table-column-group titile="时间范围">
                    <pl-base-table-column title="出发时间" field="departuretime"/>
                    <pl-base-table-column title="到达时间" field="arrivaltime"/>
                </pl-base-table-column-group>
            </pl-base-table-column-group>
            <pl-base-table-column title="顺序" field="sequenceno"/>
            <pl-base-table-column title="用时" field="costtime"/>
            <pl-base-table-column title="距离" field="distance"/>
            <pl-base-table-column title="是否终点" field="isend"/>
            <pl-base-table-column title="商务座票价" field="pricesw"/>
            <pl-base-table-column title="特等座票价" field="pricetd"/>
            <pl-base-table-column title="高级软卧上票价" field="pricegr1"/>
            <pl-base-table-column title="高级软卧下票价" field="pricegr2"/>

            <pl-base-table-column title="软卧上票价" field="pricerw1"/>
            <pl-base-table-column title="软卧下票价" field="pricerw2"/>-->
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
                data: TableData
            }
        },
    }
</script>

<style lang="scss">

</style>