<template>
    <div class="pl-date-range-panel">
        <div class="pl-date-range-panel-left">
            <pl-date-header :pick-year="p_startData.pickYear"
                            :pick-month="p_startData.pickMonth"
                            :view="view"
                            hide-right-button
                            @update:pickYear="p_leftPickYearChange"
                            @update:pickMonth="p_leftPickMonthChange"
                            @changeMode="val=>p_startData.mode = val">
                <pl-time
                        v-if="datetime"
                        :value="p_startData.timeString"
                        arrow
                        animate="scale"
                        slot="time">
                    <template slot-scope="{value}">
                        <span class="pl-date-time">{{value}}</span>
                    </template>
                </pl-time>
            </pl-date-header>
            <pl-date-panel
                    :start-date="p_startData.date"
                    :end-date="p_endData.date"
                    :pick-year="p_startData.pickYear"
                    :pick-month="p_startData.pickMonth"
                    :mode="p_startData.mode"
                    :hover-date.sync="hoverDate"
                    :max-date="maxDate"
                    :min-date="minDate"
                    @pickDate="p_pickDate"
                    @update:pickYear="p_leftPickYearSelect"
                    @update:pickMonth="p_leftPickMonthSelect"/>
        </div>
        <div class="pl-date-range-panel-right">
            <pl-date-header :pick-year="p_endData.pickYear"
                            :pick-month="p_endData.pickMonth"
                            :view="view"
                            hide-left-button
                            @update:pickYear="p_rightPickYearChange"
                            @update:pickMonth="p_rightPickMonthChange"
                            @changeMode="val=>p_endData.mode = val">
                <pl-time
                        v-if="datetime"
                        :value="p_endData.timeString"
                        arrow
                        animate="scale"
                        slot="time">
                    <template slot-scope="{value}">
                        <span class="pl-date-time">{{value}}</span>
                    </template>
                </pl-time>
            </pl-date-header>
            <pl-date-panel
                    :start-date="p_startData.date"
                    :end-date="p_endData.date"
                    :pick-year="p_endData.pickYear"
                    :pick-month="p_endData.pickMonth"
                    :mode="p_endData.mode"
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
    import PlTime from "../time/pl-time";

    export default {
        name: "pl-date-range-panel",
        components: {PlTime, PlDatePanel, PlDateHeader},
        props: {
            start: {type: String},                                  //开始日期字符串
            end: {type: String},                                    //截止日期字符串

            displayFormat: {type: String,},                         //显示值格式化字符串
            valueFormat: {type: String,},                           //值格式化字符串
            view: {type: String},                                   //视图
            datetime: {type: Boolean},                              //是否选择时间
            maxDate: {},
            minDate: {},
            decodeDateString: {},                                   //解析日期字符串的函数
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
                p_startData: {
                    pickYear: null,
                    pickMonth: null,

                    year: null,
                    month: null,
                    day: null,

                    hour: null,
                    minute: null,
                    second: null,

                    mode: this.view,

                    date: null,
                    timeString: null,
                },
                p_endData: {
                    pickYear: null,
                    pickMonth: null,

                    year: null,
                    month: null,
                    day: null,

                    hour: null,
                    minute: null,
                    second: null,

                    mode: this.view,

                    date: null,
                    timeString: null,
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
                this.p_startData = this.decodeDateString(this.p_start)
                this.p_endData = this.decodeDateString(this.p_end)
                if (this.p_startData.month === 11) {
                    this.p_endData.pickYear = this.p_startData.pickYear + 1
                    this.p_endData.pickMonth = 0
                } else {
                    this.p_endData.pickYear = this.p_startData.pickYear
                    this.p_endData.pickMonth = this.p_startData.pickMonth + 1
                }
            },
            /**
             * 处理日期面板选择日期事件
             * @author  韦胜健
             * @date    2019/3/8 09:47
             */
            p_pickDate(newDate) {
                if (!this.p_startData.date) {
                    this.p_startData.date = newDate
                    return
                }
                if (!this.p_endData.date) {
                    const startTime = this.p_startData.date.getTime()
                    const newTime = newDate.getTime()
                    if (startTime > newTime) {
                        this.p_endData.date = this.p_startData.date
                        this.p_startData.date = newDate
                    } else {
                        this.p_endData.date = newDate
                    }
                    this.p_emitVal()
                    return
                }
                this.p_startData.date = newDate
                this.p_endData.date = null
            },

            /**
             * 左侧日期头年份变化处理
             * @author  韦胜健
             * @date    2019/3/8 09:47
             */
            p_leftPickYearChange(val) {
                this.p_startData.pickYear = val
                this.p_endData.pickYear = this.p_startData.pickMonth === 11 ? val + 1 : val
            },
            /**
             * 左侧日期头月份变化处理
             * @author  韦胜健
             * @date    2019/3/8 09:47
             */
            p_leftPickMonthChange(val) {
                this.p_startData.pickMonth = val
                this.p_endData.pickMonth = val === 11 ? 0 : val + 1
                this.p_endData.pickYear = val === 11 ? this.p_startData.pickYear + 1 : this.p_startData.pickYear
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
                this.p_startData.mode = 'month'
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
                this.p_startData.mode = 'date'
            },
            /**
             * 右侧日期头年份变化处理
             * @author  韦胜健
             * @date    2019/3/8 09:47
             */
            p_rightPickYearChange(val) {
                this.p_endData.pickYear = val
                this.p_startData.pickYear = this.p_startData.pickMonth === 11 ? val - 1 : val
            },
            /**
             * 右侧日期头月份变化处理
             * @author  韦胜健
             * @date    2019/3/8 09:48
             */
            p_rightPickMonthChange(val) {
                this.p_endData.pickMonth = val
                this.p_startData.pickMonth = val === 0 ? 11 : val - 1
                this.p_startData.pickYear = val === 0 ? this.p_endData.pickYear - 1 : this.p_endData.pickYear
            },
            p_rightPickYearSelect(val) {
                this.p_rightPickYearChange(val)
                if (this.view === 'year') {
                    this.p_emitVal()
                    return
                }
                this.p_endData.mode = 'month'
            },
            p_rightPickMonthSelect(val) {
                this.p_rightPickMonthChange(val)
                if (this.view === 'month') {
                    this.p_emitVal()
                    return
                }
                this.p_endData.mode = 'date'
            },

            async p_emitVal() {
                this.p_start = this.$plain.$utils.dateFormat(this.p_startData.date, this.valueFormat)
                this.p_end = this.$plain.$utils.dateFormat(this.p_endData.date, this.valueFormat)
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