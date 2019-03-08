<template>
    <div class="pl-date-range-panel">
        <div class="pl-date-range-panel-left">
            <pl-date-header :pick-year="left.pickYear"
                            :pick-month="left.pickMonth"
                            :view="view"
                            hide-right-button
                            @update:pickYear="p_leftPickYearChange"
                            @update:pickMonth="p_leftPickMonthChange"
                            @changeMode="val=>left.mode = val"/>
            <pl-date-panel
                    :start-date="left.date"
                    :end-date="right.date"
                    :pick-year="left.pickYear"
                    :pick-month="left.pickMonth"
                    :mode="left.mode"
                    :hover-date.sync="hoverDate"
                    :max-date="maxDate"
                    :min-date="minDate"
                    @pickDate="p_pickDate"
                    @update:pickYear="p_leftPickYearSelect"
                    @update:pickMonth="p_leftPickMonthSelect"/>
        </div>
        <div class="pl-date-range-panel-right">
            <pl-date-header :pick-year="right.pickYear"
                            :pick-month="right.pickMonth"
                            :view="view"
                            hide-left-button
                            @update:pickYear="p_rightPickYearChange"
                            @update:pickMonth="p_rightPickMonthChange"
                            @changeMode="val=>right.mode = val"/>
            <pl-date-panel
                    :start-date="left.date"
                    :end-date="right.date"
                    :pick-year="right.pickYear"
                    :pick-month="right.pickMonth"
                    :mode="right.mode"
                    :hover-date.sync="hoverDate"
                    :max-date="maxDate"
                    :min-date="minDate"
                    @pickDate="p_pickDate"
                    @update:pickYear="p_rightPickYearSelect"
                    @update:pickMonth="p_rightPickMonthSelect"/>
        </div>
    </div>
</template>

<script>
    import PlDateHeader from "./pl-date-header";
    import PlDatePanel from "./pl-date-panel";

    export default {
        name: "pl-date-range-panel",
        components: {PlDatePanel, PlDateHeader},
        props: {
            start: {type: String},                                  //开始日期字符串
            end: {type: String},                                    //截止日期字符串

            displayFormat: {type: String,},                         //显示值格式化字符串
            valueFormat: {type: String,},                           //值格式化字符串
            view: {type: String},                                   //视图
            datetime: {type: Boolean},                              //是否选择时间
            maxDate: {},
            minDate: {},
        },
        watch: {
            start(val) {
                if (this.p_start !== val) {
                    this.p_start = val
                    this.p_reset()
                }
            },
            p_start(val) {
                if (this.start !== val) this.$emit('update:start', val)
            },
            end(val) {
                if (this.p_end !== val) this.p_end = val
            },
            p_end(val) {
                if (this.end !== val) this.$emit('update:end', val)
            },
        },
        data() {
            return {
                /*左边缓存数据*/
                left: {
                    pickYear: null,
                    pickMonth: null,
                    mode: this.view,
                    date: null,
                },
                /*右边缓存数据*/
                right: {
                    pickYear: null,
                    pickMonth: null,
                    mode: this.view,
                    date: null,
                },
                /*鼠标悬浮的日期*/
                hoverDate: null,
                /*起始时间缓存值*/
                p_start: this.start,
                /*截止时间缓存值*/
                p_end: this.end,
            }
        },
        created() {
            this.p_reset()
        },
        methods: {
            /**
             * 重设选择年份以及月份
             * @author  韦胜健
             * @date    2019/3/8 09:44
             */
            p_reset() {
                const now = new Date()
                let year, month, date, startDate, endDate
                startDate = this.$plain.$utils.dateParse(this.start, this.valueFormat)
                endDate = this.$plain.$utils.dateParse(this.end, this.valueFormat)

                year = !!startDate ? startDate.getFullYear() : now.getFullYear()
                month = !!startDate ? startDate.getMonth() : now.getMonth()
                date = !!startDate ? startDate.getDate() : now.getDate()

                this.left.pickYear = year
                this.left.pickMonth = month

                if (month === 11) {
                    this.right.pickYear = year + 1
                    this.right.pickMonth = 0
                } else {
                    this.right.pickYear = year
                    this.right.pickMonth = month + 1
                }

                this.left.date = startDate
                this.right.date = endDate
            },
            /**
             * 处理日期面板选择日期事件
             * @author  韦胜健
             * @date    2019/3/8 09:47
             */
            p_pickDate(newDate) {
                if (!this.left.date) {
                    this.left.date = newDate
                    return
                }
                if (!this.right.date) {
                    const startTime = this.left.date.getTime()
                    const newTime = newDate.getTime()
                    if (startTime > newTime) {
                        this.right.date = this.left.date
                        this.left.date = newDate
                    } else {
                        this.right.date = newDate
                    }
                    this.p_emitVal()
                    return
                }
                this.left.date = newDate
                this.right.date = null
            },

            /**
             * 左侧日期头年份变化处理
             * @author  韦胜健
             * @date    2019/3/8 09:47
             */
            p_leftPickYearChange(val) {
                this.left.pickYear = val
                this.right.pickYear = this.left.pickMonth === 11 ? val + 1 : val
            },
            /**
             * 左侧日期头月份变化处理
             * @author  韦胜健
             * @date    2019/3/8 09:47
             */
            p_leftPickMonthChange(val) {
                this.left.pickMonth = val
                this.right.pickMonth = val === 11 ? 0 : val + 1
                this.right.pickYear = val === 11 ? this.left.pickYear + 1 : this.left.pickYear
            },
            /**
             * 左侧日期面板选择年份处理
             * @author  韦胜健
             * @date    2019/3/8 10:03
             */
            p_leftPickYearSelect(val) {
                this.p_leftPickYearChange(val)
                if (this.view === 'year') {
                    this.p_emitVal()
                    return
                }
                this.left.mode = 'month'
            },
            /**
             * 左侧日期面板选择月份处理
             * @author  韦胜健
             * @date    2019/3/8 10:03
             */
            p_leftPickMonthSelect(val) {
                this.p_leftPickMonthChange(val)
                if (this.view === 'month') {
                    this.p_emitVal()
                    return
                }
                this.left.mode = 'date'
            },
            /**
             * 右侧日期头年份变化处理
             * @author  韦胜健
             * @date    2019/3/8 09:47
             */
            p_rightPickYearChange(val) {
                this.right.pickYear = val
                this.left.pickYear = this.left.pickMonth === 11 ? val - 1 : val
            },
            /**
             * 右侧日期头月份变化处理
             * @author  韦胜健
             * @date    2019/3/8 09:48
             */
            p_rightPickMonthChange(val) {
                this.right.pickMonth = val
                this.left.pickMonth = val === 0 ? 11 : val - 1
                this.left.pickYear = val === 0 ? this.right.pickYear - 1 : this.right.pickYear
            },
            p_rightPickYearSelect(val) {
                this.p_rightPickYearChange(val)
                if (this.view === 'year') {
                    this.p_emitVal()
                    return
                }
                this.right.mode = 'month'
            },
            p_rightPickMonthSelect(val) {
                this.p_rightPickMonthChange(val)
                if (this.view === 'month') {
                    this.p_emitVal()
                    return
                }
                this.right.mode = 'date'
            },

            async p_emitVal() {
                this.p_start = this.$plain.$utils.dateFormat(this.left.date, this.valueFormat)
                this.p_end = this.$plain.$utils.dateFormat(this.right.date, this.valueFormat)
                await this.$plain.nextTick()
                this.$emit('change')
            },
        }
    }
</script>

<style lang="scss">
    .pl-date-range-panel {
        display: inline-flex;
        align-items: center;
        .pl-date-range-panel-left {
            margin-right: 12px;
        }
    }
</style>