<template>
    <div class="pl-date-range-panel">
        <div class="pl-date-range-panel-left">
            <pl-date-header :pick-year="leftPickYear"
                            :pick-month="leftPickMonth"
                            :view="view"
                            @changeMode="val=>mode = val"/>
            <pl-date-panel
                    :start-date="startDate"
                    :end-date="endDate"
                    :pick-year="leftPickYear"
                    :pick-month="leftPickMonth"
                    :mode="mode"
                    :hover-date.sync="hoverDate"
                    :max-date="maxDate"
                    :min-date="minDate"

                    @update:pickYear="p_pickYear"
                    @update:pickMonth="p_pickMonth"
                    @pickDate="p_pickDate"/>
        </div>
        <div class="pl-date-range-panel-right">
            <pl-date-header :pick-year="rightPickYear"
                            :pick-month="rightPickMonth"
                            :view="view"
                            @changeMode="val=>mode = val"/>
            <pl-date-panel
                    :start-date="startDate"
                    :end-date="endDate"
                    :pick-year="rightPickYear"
                    :pick-month="rightPickMonth"
                    :mode="mode"
                    :hover-date.sync="hoverDate"
                    :max-date="maxDate"
                    :min-date="minDate"

                    @update:pickYear="p_pickYear"
                    @update:pickMonth="p_pickMonth"
                    @pickDate="p_pickDate"/>
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
            start: {type: String},
            end: {type: String},

            displayFormat: {type: String,},
            valueFormat: {type: String,},
            view: {type: String},
            datetime: {type: Boolean},
            max: {type: String,},
            min: {type: String,},
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
            const endDate = !this.end ? null : this.$plain.$utils.dateParse(this.end, this.valueFormat)
            return {
                leftPickYear: null,
                leftPickMonth: null,
                rightPickYear: null,
                rightPickMonth: null,

                mode: this.view,
                hoverDate: null,
                startDate: null,
                endDate,
                p_start: this.start,
                p_end: this.end,
            }
        },
        computed: {
            maxDate() {
                if (!this.max) return null
                const maxDate = this.$plain.$utils.dateParse(this.max, this.valueFormat)
                maxDate.setHours(23)
                maxDate.setMinutes(59)
                maxDate.setSeconds(59)
                return maxDate
            },
            minDate() {
                if (!this.min) return null
                const minDate = this.$plain.$utils.dateParse(this.min, this.valueFormat)
                minDate.setHours(0)
                minDate.setMinutes(0)
                minDate.setSeconds(0)
                return minDate
            },
        },
        created() {
            this.p_reset()
        },
        methods: {
            p_reset() {
                const now = new Date()
                let year, month, date, startDate, endDate
                startDate = this.$plain.$utils.dateParse(this.start, this.valueFormat)
                endDate = this.$plain.$utils.dateParse(this.end, this.valueFormat)

                year = !!startDate ? startDate.getFullYear() : now.getFullYear()
                month = !!startDate ? startDate.getMonth() : now.getMonth()
                date = !!startDate ? startDate.getDate() : now.getDate()

                this.leftPickYear = year
                this.leftPickMonth = month

                if (month === 11) {
                    this.rightPickYear = year + 1
                    this.rightPickMonth = 0
                } else {
                    this.rightPickYear = year
                    this.rightPickMonth = month + 1
                }

                this.startDate = startDate
                this.endDate = endDate
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
                if (!this.startDate) {
                    this.startDate = newDate
                    return
                }
                if (!this.endDate) {
                    const startTime = this.startDate.getTime()
                    const newTime = newDate.getTime()
                    if (startTime > newTime) {
                        this.endDate = this.startDate
                        this.startDate = newDate
                    } else {
                        this.endDate = newDate
                    }
                    this.p_start = this.$plain.$utils.dateFormat(this.startDate, this.valueFormat)
                    this.p_end = this.$plain.$utils.dateFormat(this.endDate, this.valueFormat)
                    return
                }
                this.startDate = newDate
                this.endDate = null
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