<template>
    <div class="pl-date-panel">
        <pl-date-header/>
        <div class="pl-date-panel-body">
            <pl-date-year-panel :value="pickYear" :current-year="2017"/>
            <pl-date-month-panel :value="pickMonth" :current-month="5"/>
            <pl-date-day-panel :current-date="current" :start-date="start" :hover-date="hoverDate"/>
        </div>
    </div>
</template>

<script>
    import PlDateDayPanel from "./pl-date-day-panel";
    import PlDateHeader from "./pl-date-header";
    import PlDateYearPanel from "./pl-date-year-panel";
    import PlDateMonthPanel from "./pl-date-month-panel";

    export default {
        name: "pl-date-panel",
        components: {PlDateMonthPanel, PlDateYearPanel, PlDateHeader, PlDateDayPanel},
        props: {
            pickYear: {},                                   //当前选择面板的年份
            pickMonth: {},                                  //当前选择面板的月份
            mode: {},                                       //当前显示的模式
            year: {},                                       //当前值的年份
            month: {},                                      //当前值的月份
            date: {},                                       //当前值的日期
            startDate: {},                                  //开始时间日期
            endDate: {},                                    //截止时间日期
            hoverDate: {},                                  //鼠标浮动所处的日期
            maxDate: {},                                    //最大可选日期
            minDate: {},                                    //最小可选日期
        },
        data() {
            const now = new Date()

            now.setDate(now.getDate() + 1)
            now.setFullYear(2018)
            now.setMonth(5)
            const current = this.$plain.$utils.deepCopy(now)

            now.setDate(15)
            const start = this.$plain.$utils.deepCopy(now)

            now.setMonth(now.getMonth() + 1)
            now.setDate(5)
            const end = this.$plain.$utils.deepCopy(now)

            return {
                current,
                start,
                end,
            }
        },
    }
</script>

<style lang="scss">
    .pl-date-panel {
        @include public-style;
        width: 196px;
        display: inline-block;
        .pl-date-panel-body {
            width: 196px;
            height: 238px;
        }
    }
</style>