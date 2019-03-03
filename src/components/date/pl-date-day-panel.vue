<template>
    <div class="pl-date-day-panel">
        <div class="pl-date-day-panel-item"
             v-for="(weekName,index) in weekNames"
             :key="`_${index}`">
            <div class="pl-date-day-panel-item-inner">
                <span>{{weekName}}</span>
            </div>
        </div>
        <div
                v-for="(item,index) in days"
                :key="index"
                class="pl-date-day-panel-item"
                :class="{
                    'pl-date-day-panel-item-today':item.isToday,
                    'pl-date-day-panel-item-other-month':item.isOtherMonth,
                }">
            <div class="pl-date-day-panel-item-inner">
                <span>{{item.isToday?'今':item.day}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pl-date-day-panel",
        props: {
            year: {},                                   //当前面板显示的年份
            month: {},                                  //当前面板显示的月份

            currentDate: {},                            //当前日期
            maxDate: {},                                //最大可选日期
            minDate: {},                                //最小可选日期

            startDate: {},                              //日期范围开始日期
            endDate: {},                                //日期范围结束日期
            hoverDate: {},                              //当前鼠标浮动的日期
        },
        data() {
            const now = new Date()
            const nowYear = now.getFullYear()
            const nowMonth = now.getMonth()
            const nowDay = now.getDate()

            return {
                weekNames: ['日', '1', '二', '三', '四', '五', '六'],
                now,
                nowYear,
                nowMonth,
                nowDay,
            }
        },
        computed: {
            maxTime() {
                return !!this.maxDate ? this.maxDate.getTime() : null
            },
            minTime() {
                return !!this.minDate ? this.minDate.getTime() : null
            },
            selectYear() {
                return this.year != null ? this.year : new Date().getFullYear()
            },
            selectMonth() {
                return this.month != null ? this.month : new Date().getMonth()
            },
            days() {
                let days = []
                let date = new Date()
                let month = this.selectMonth                                //当前显示日历版的月份
                date.setFullYear(this.selectYear, month, 1)                 //当前日历版的年月时间

                /*---------------------------------------添加目标月上个月日期-------------------------------------------*/
                let week = date.getDay()                                    //目标月的第一天是星期几
                date.setDate(0)                                             //设置时间为目标月上个月的最后一天
                let day = date.getDate()
                while (week > 0) {                                          //添加上个月的最后几天
                    date.setDate(day)
                    days.unshift(this.newPushDate(date))
                    day--
                    week--
                }
                /*---------------------------------------添加目标月日期-------------------------------------------*/
                date.setFullYear(this.selectYear, month + 1, 1)             //设置日期为目标月的下一月，1号
                date.setDate(0)                                             //设置日期为目标月最后一天
                day = date.getDate()                                        //目标月最后一天
                for (let i = 1; i <= day; i++) {                            //添加目标月日期
                    date.setDate(i)
                    days.push(this.newPushDate(date))
                }
                /*---------------------------------------添加目标月下个月日期-------------------------------------------*/
                date.setFullYear(this.selectYear, month + 1, 1)             //设置日期为目标月的下一月，1号
                for (let i = 1; days.length < 42; i++) {
                    date.setDate(i)
                    days.push(this.newPushDate(date))
                }
                return days
            },
        },
        methods: {
            newPushDate(date) {
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const isToday = (year === this.nowYear) && (month === this.nowMonth) && (day === this.nowDay)
                return {
                    year,
                    month,
                    day,
                    time: date.getTime(),
                    disabled: (!!this.maxTime && date.getTime() > this.maxTime) || (!!this.minTime && date.getTime() < this.minTime),
                    isToday,
                    isOtherMonth: month !== this.selectMonth
                }
            },
        },
    }
</script>

<style lang="scss">

    $itemSize: 28px;

    .pl-date-day-panel {
        @include public-style;
        font-size: 12px;
        box-sizing: border-box;
        display: inline-flex;
        width: $itemSize*7;
        flex-wrap: wrap;
        color: $color-normal-sub-color;
        user-select: none;
        .pl-date-day-panel-item {
            height: $itemSize;
            width: $itemSize;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-bottom: 6px;
            .pl-date-day-panel-item-inner {
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transform: scale(0.8);
            }

            &.pl-date-day-panel-item-today {
                .pl-date-day-panel-item-inner {
                    background-color: $color-success;
                    border-radius: $itemSize;
                    color: white;
                }
            }
            &.pl-date-day-panel-item-other-month {
                color: $color-normal-disabled;
            }
            &:hover {
                background-color: $color-primary-light;
                color: $color-normal-sub-color;
            }
        }
    }
</style>