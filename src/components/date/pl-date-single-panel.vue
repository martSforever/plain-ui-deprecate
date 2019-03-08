<template>
    <div class="pl-date-single-panel">
        <pl-date-header :pick-year.sync="pickYear"
                        :pick-month.sync="pickMonth"
                        :view="view"
                        @changeMode="val=>mode = val">
            <pl-time :value="p_time"
                     arrow
                     animate="scale"
                     initialized
                     slot="time">
                <template slot-scope="{value}">
                    <span class="pl-date-time">{{value}}</span>
                </template>
            </pl-time>
        </pl-date-header>
        <pl-date-panel
                :pick-year="pickYear"
                :pick-month="pickMonth"
                :mode="mode"
                :year="year"
                :month="month"
                :date="date"
                :value-date="valueDate"
                :max-date="maxDate"
                :min-date="minDate"
                :now-year="nowYear"
                :now-month="nowMonth"
                :now-day="nowDay"

                @update:pickYear="p_pickYear"
                @update:pickMonth="p_pickMonth"
                @pickDate="p_pickDate"
        />
    </div>
</template>

<script>
    import PlDatePanel from "./pl-date-panel";
    import PlDateHeader from "./pl-date-header";
    import PlTime from "../time/pl-time";

    export default {
        name: "pl-date-single-panel",
        components: {PlTime, PlDateHeader, PlDatePanel},
        props: {
            value: {},
            displayFormat: {type: String,},
            valueFormat: {type: String,},
            view: {type: String, default: 'date'},
            datetime: {type: Boolean},
            maxDate: {},
            minDate: {},
            nowYear: {},                                    //当前年份
            nowMonth: {},                                   //当前月份
            nowDay: {},                                     //当前日
        },
        watch: {
            value(val) {
                if (this.p_value !== val) {
                    this.p_value = val
                    this.p_reset()
                }
            },
            p_value(val) {
                if (this.value !== val) {
                    this.$emit('input', val)
                    this.p_reset()
                }
            },
        },
        data() {
            return {
                pickYear: null,
                pickMonth: null,
                mode: this.view,

                year: null,
                month: null,
                date: null,
                valueDate: null,
                p_value: this.value,
                p_time: '08:00:00'
            }
        },
        created() {
            this.p_reset()
        },
        methods: {
            p_reset() {
                const now = new Date()
                if (!this.p_value) {
                    this.year = null
                    this.month = null
                    this.date = null
                    this.valueDate = null
                } else {
                    const valueDate = this.$plain.$utils.dateParse(this.p_value, this.valueFormat)
                    this.year = valueDate.getFullYear()
                    this.month = valueDate.getMonth()
                    this.date = valueDate.getDate()
                    this.valueDate = valueDate
                }
                this.pickYear = this.year != null ? this.year : now.getFullYear()
                this.pickMonth = this.month != null ? this.month : now.getMonth()
            },
            p_pickYear(val) {
                this.pickYear = val
                if (this.view === 'year') {
                    const newDate = new Date()
                    newDate.setFullYear(val)
                    this.p_value = this.$plain.$utils.dateFormat(newDate, this.valueFormat)
                } else {
                    this.mode = 'month'
                }
            },
            p_pickMonth(val) {
                this.pickMonth = val
                if (this.view === 'month') {
                    const newDate = new Date()
                    newDate.setFullYear(this.pickYear)
                    newDate.setMonth(val)
                    this.p_value = this.$plain.$utils.dateFormat(newDate, this.valueFormat)
                } else {
                    this.mode = 'date'
                }
            },
            p_pickDate(newDate) {
                this.p_value = this.$plain.$utils.dateFormat(newDate, this.valueFormat)
            },
        }
    }
</script>

<style lang="scss">

</style>