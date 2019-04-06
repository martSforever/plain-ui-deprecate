<template>
    <div class="pl-date">
        <pl-popover
                ref="popover"
                v-bind="popoverBinding"
                v-model="p_show"
                disabledEqual
                :width="null"
                :height="null"
        >
            <pl-input
                    :value="showValue"
                    v-bind="inputBinding"
                    :clearIcon="datetime?'pl-date-time-fill':'pl-date-fill'"
                    :readonly="true"
                    :width="inputWidth!=null?inputWidth:range?280:200"
                    :defaultClear="false"
                    @clear="e=>!readonly && !disabled && p_clear(e)"
            />
            <div slot="popper" class="pl-date-popper">
                <pl-date-range-panel
                        v-if="range"
                        :start.sync="p_start"
                        :end.sync="p_end"

                        :display-format="p_df"
                        :value-format="p_vf"
                        :max-date="p_maxDate"
                        :min-date="p_minDate"
                        :view="view"
                        :datetime="datetime"
                        :decode-date-string="p_decodeDateString"

                        @close="p_close"/>
                <pl-date-single-panel
                        v-else
                        :value="p_value"

                        :display-format="p_df"
                        :value-format="p_vf"
                        :max-date="p_maxDate"
                        :min-date="p_minDate"
                        :view="view"
                        :datetime="datetime"
                        :now-year="nowYear"
                        :now-month="nowMonth"
                        :now-day="nowDay"
                        :decode-date-string="p_decodeDateString"

                        @input="p_valueChange"
                        @close="p_close"/>
            </div>
        </pl-popover>
    </div>
</template>

<script>
    import PlDatePanel from "./pl-date-panel";
    import {InputMixin} from "../../mixin/component-mixin";
    import {DateUtil} from "./index";
    import PlDateSinglePanel from "./pl-date-single-panel";
    import PlInput from "../input/pl-input";
    import PlPopover from "../popper/pl-popover";
    import {PopoverMixin} from "../popper";
    import PlDateRangePanel from "./pl-date-range-panel";

    export default {
        name: "pl-date",
        components: {PlDateRangePanel, PlPopover, PlInput, PlDateSinglePanel, PlDatePanel},
        mixins: [InputMixin, PopoverMixin],
        props: {
            value: {type: String,},
            start: {type: String},
            end: {type: String},
            max: {type: String},
            min: {type: String},
            show: {type: Boolean, default: false},
            displayFormat: {type: String},
            valueFormat: {type: String},
            datetime: {type: Boolean},
            range: {type: Boolean},
            view: {type: String, default: 'date'},
            confirmButton: {type: Boolean},

            placeholder: {type: String, default: '请选择日期时间……'},
            inputWidth: {type: Number},
        },
        watch: {
            value(val) {
                if (this.p_value !== val) this.p_value = val
            },
            p_value(val) {
                if (this.value !== val) this.$emit('input', val)
            },
            start(val) {
                if (this.p_start !== val) this.p_start = val
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
            show(val) {
                if (this.p_show !== val) this.p_show = val
            },
            p_show(val) {
                if (this.show !== val) this.$emit('update:show', val)
                if (val) {
                    this.$nextTick(async () => {
                        const times = this.$plain.$dom.findComponentsDownward(this, 'pl-time')
                        times.forEach(time => {
                            time.$on('show', async () => {
                                await this.$plain.nextTick()
                                this.$refs.popover.addRelateEl(time.$refs.panel.$el)
                            })
                            time.$on('hide', async () => {
                                this.$refs.popover.removeRelateEl(time.$refs.panel.$el)
                            })
                        })
                    })
                }
            },
        },
        data() {
            const nowDate = new Date()
            return {
                p_watchCurrentValue: false,
                p_value: this.value,
                p_start: this.start,
                p_end: this.end,
                p_show: this.show,

                nowDate,
                nowYear: nowDate.getFullYear(),
                nowMonth: nowDate.getMonth(),
                nowDay: nowDate.getDate(),
                timeEls: [],
            }
        },
        computed: {
            p_df() {
                return DateUtil.getDefaultDisplayFormat(this.displayFormat, this.datetime, this.view)
            },
            p_vf() {
                return DateUtil.getDefaultValueFormat(this.valueFormat, this.datetime, this.view)
            },
            showValue() {
                if (!this.range) {
                    if (!this.p_value) return null
                    return this.$plain.$utils.dateFormat(this.$plain.$utils.dateParse(this.p_value, this.p_vf), this.p_df)
                } else {
                    if (!this.p_start || !this.p_end) return null
                    return `${this.$plain.$utils.dateFormat(this.$plain.$utils.dateParse(this.p_start, this.p_vf), this.p_df)}  ~  ${this.$plain.$utils.dateFormat(this.$plain.$utils.dateParse(this.p_end, this.p_vf), this.p_df)}`
                }
            },
            p_maxDate() {
                if (!this.max) return null
                const date = this.$plain.$utils.dateParse(this.max, this.p_vf)

                if (this.view === 'year') {
                    date.setDate(1)
                    date.setMonth(0)
                }
                if (this.view === 'month') {
                    date.setDate(1)
                }
                return date
            },
            p_minDate() {
                if (!this.min) return null
                const date = this.$plain.$utils.dateParse(this.min, this.p_vf)

                if (this.view === 'year') {
                    date.setDate(1)
                    date.setMonth(0)
                }
                if (this.view === 'month') {
                    date.setDate(1)
                }
                return date
            },
        },
        methods: {
            p_valueChange(val) {
                this.p_value = val
            },
            async p_close() {
                await this.$plain.nextTick()
                this.p_show = false
            },
            p_clear() {
                this.p_value = null
                this.p_start = null
                this.p_end = null
                this.p_show = false
            },
            p_decodeDateString(str) {
                const ret = {
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
                    time: null,
                    timeString: null,
                    maxTimeString: null,
                    minTimeString: null,
                }
                if (str == null) {
                    ret.pickYear = this.nowYear
                    ret.pickMonth = this.nowMonth
                    return ret
                } else {
                    const date = this.$plain.$utils.dateParse(str, this.p_vf)
                    ret.date = date
                    if (this.view === 'year') {
                        date.setDate(1)
                        date.setMonth(0)
                    }
                    else if (this.view === 'month') {
                        date.setDate(1)
                    }
                    if (!this.datetime) {
                        date.setHours(0)
                        date.setMinutes(0)
                        date.setSeconds(0)
                    }
                    const dateInfo = this.$plain.$utils.decodeDate(date)
                    Object.assign(ret, dateInfo)
                    ret.pickYear = dateInfo.year
                    ret.pickMonth = dateInfo.month

                    if (this.datetime) {
                        if (!!this.max) {
                            const maxDate = this.$plain.$utils.dateParse(this.max, this.p_vf)
                            const {year, month, day, hour, minute, second} = this.$plain.$utils.decodeDate(maxDate)
                            if (year === ret.year && month === ret.month && day === ret.day) {
                                ret.maxTimeString = `${this.$plain.$utils.zeroize(hour)}:${this.$plain.$utils.zeroize(minute)}:${this.$plain.$utils.zeroize(second)}`
                            }
                        }
                        if (!!this.min) {
                            const minDate = this.$plain.$utils.dateParse(this.min, this.p_vf)
                            const {year, month, day, hour, minute, second} = this.$plain.$utils.decodeDate(minDate)
                            if (year === ret.year && month === ret.month && day === ret.day) {
                                ret.minTimeString = `${this.$plain.$utils.zeroize(hour)}:${this.$plain.$utils.zeroize(minute)}:${this.$plain.$utils.zeroize(second)}`
                            }
                        }
                    }
                }

                return ret
            },
        }
    }
</script>

<style lang="scss">
    .pl-date {
        @include public-style;
        display: inline-block;
    }

    .pl-date-popper {
        padding: 0 8px 0px 8px;
        .pl-date-time {
            font-size: 12px;
            color: var(--p-color-primary);
        }
    }
</style>