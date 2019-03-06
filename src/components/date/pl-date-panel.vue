<template>
    <div class="pl-date-panel">
        <div class="pl-date-panel-body">
            <pl-date-year-panel :value="pickYear" :current-year="year" @input="p_changePickYear"/>
            <pl-date-month-panel :value="pickMonth" :current-month="month" @input="p_changePickMonth"/>
            <pl-date-day-panel
                    :year="p_pickYear"
                    :month="p_pickMonth"
                    :current-date="valueDate"
                    :max-date="maxDate"
                    :min-date="minDate"
                    :start-date="startDate"
                    :end-date="endDate"
                    :hover-date="hoverDate"/>
        </div>
    </div>
</template>

<script>
    import PlDateDayPanel from "./pl-date-day-panel";
    import PlDateYearPanel from "./pl-date-year-panel";
    import PlDateMonthPanel from "./pl-date-month-panel";

    export default {
        name: "pl-date-panel",
        components: {PlDateMonthPanel, PlDateYearPanel, PlDateDayPanel},
        props: {
            pickYear: {},                                   //当前选择面板的年份
            pickMonth: {},                                  //当前选择面板的月份
            mode: {},                                       //当前显示的模式
            year: {},                                       //当前值的年份
            month: {},                                      //当前值的月份
            date: {},                                       //当前值的日期
            valueDate: {},                                  //当前日期的时间Date对象
            startDate: {},                                  //开始时间日期
            endDate: {},                                    //截止时间日期
            hoverDate: {},                                  //鼠标浮动所处的日期
            maxDate: {},                                    //最大可选日期
            minDate: {},                                    //最小可选日期
        },
        watch: {
            pickYear(val) {
                if (this.p_pickYear !== val) this.p_pickYear = val
            },
            p_pickYear(val) {
                this.$emit('update:pickYear', val)
            },
            pickMonth(val) {
                if (this.p_pickMonth !== val) this.p_pickMonth = val
            },
            p_pickMonth(val) {
                this.$emit('update:pickMonth', val)
            },
        },
        data() {
            return {
                p_pickYear: this.pickYear,
                p_pickMonth: this.pickMonth,
            }
        },
        methods: {
            p_changePickYear(val) {
                this.p_pickYear = val
            },
            p_changePickMonth(val) {
                this.p_pickMonth = val
            },
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