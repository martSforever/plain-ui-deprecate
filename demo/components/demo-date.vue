<template>
    <div class="demo-date">
        <demo-row :title="`普通用法，选择日期:${val[0]}`">
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
        <demo-row title="三种视图,最大最小值">
            <demo-row-item title="年">
                <link-date v-model="val[1]" view="year" max="2020" min="2018"/>
            </demo-row-item>
            <demo-row-item title="月">
                <link-date v-model="val[2]" view="month" max="2020-05" min="2018-04"/>
            </demo-row-item>
            <demo-row-item title="日">
                <link-date v-model="val[3]" view="date" max="2020-05-05" min="2018-04-04"/>
            </demo-row-item>
        </demo-row>
        <demo-row :title="`值以及显示值格式化:${val[5]}`">
            <link-date v-model="val[5]" valueFormat="YYYYMMDD" displayFormat="YYYY年MM月DD日"/>
        </demo-row>
        <demo-row :title="`日期范围:${val[6]}-${val[7]}`">
            <link-date :start.sync="val[6]" :end.sync="val[7]" range/>
        </demo-row>
        <demo-row :title="`日期范围,最大最小值：max=2020-05-05，min=2018-04-01`">
            <link-date :start.sync="val[6]" :end.sync="val[7]" range max="2020-05-05" min="2018-04-04"/>
        </demo-row>

        <demo-row :title="`日期时间选择:${val[10]}`">
            <link-date v-model="val[10]" datetime/>
        </demo-row>
        <demo-row :title="`日期范围:${val[11]}-${val[12]}`">
            <link-date :start.sync="val[11]" :end.sync="val[12]" range datetime/>
        </demo-row>
        <demo-row :title="`日期时间选择:${val[10]}，最大时间：，最小时间`">
            <link-date v-model="val[10]" datetime max="2020-05-05 12:38:38" min="2018-04-04 11:15:16"/>
        </demo-row>
        <demo-row :title="`日期时间范围选择:${val[10]}，最大时间：，最小时间`">
            <link-date :start.sync="val[11]" :end.sync="val[12]" range datetime max="2020-05-05 12:38:38" min="2018-04-04 11:15:16"/>
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

                    10: '2019-05-05 10:09:05',
                    11: '2019-05-05 12:36:35',
                    12: '2019-08-10 11:12:13',
                }
            }
        },
    }
</script>

<style lang="scss">

</style>