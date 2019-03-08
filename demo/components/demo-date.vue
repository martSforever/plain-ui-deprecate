<template>
    <div class="demo-date">
        <!--<demo-row :title="`普通用法，选择日期:${val[0]}`">
            <link-date v-model="val[0]"/>
        </demo-row>
        <demo-row title="三种视图">
            <demo-row-item title="年">
                <link-date v-model="val[1]" view="year"/>
            </demo-row-item>
            <demo-row-item title="月">
                <link-date v-model="val[2]" view="month"/>
            </demo-row-item>
            <demo-row-item title="日">
                <link-date v-model="val[3]" view="date"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="最大最小时间,max=2020-05-05，min=2018-01-01">
            <link-date v-model="val[4]" max="2020-05-05" min="2018-01-01"/>
        </demo-row>
        <demo-row :title="`值以及显示值格式化:${val[5]}`">
            <link-date v-model="val[5]" valueFormat="YYYYMMDD" displayFormat="YYYY年MM月DD日"/>
        </demo-row>-->
        <demo-row :title="`日期范围:${val[6]}-${val[7]}`">
            <link-date :start.sync="val[6]" :end.sync="val[7]" range/>
        </demo-row>
    </div>
</template>

<script>
    import PlDateYearPanel from "../../src/components/date/pl-date-year-panel";
    import PlDateDayPanel from "../../src/components/date/pl-date-day-panel";
    import PlDatePanel from "../../src/components/date/pl-date-panel";

    export default {
        name: "demo-date",
        components: {PlDatePanel, PlDateDayPanel, PlDateYearPanel},
        data() {
            return {
                val: {
                    0: '2019-03-05',
                    5: '20190306',
                    6: '2019-03-2',
                    7: '2019-03-20',

                    8: null,
                    9: null,
                }
            }
        },
    }
</script>

<style lang="scss">

</style>