<template>
    <div class="pl-date">
        <pl-popover
                v-bind="popoverBinding"
                v-model="p_show"
                disabledEqual
                :width="null"
                :height="null"
        >
            <pl-input
                    :value="showValue"
                    v-bind="inputBinding"
                    clearIcon="pl-date"
                    :readonly="true"
                    :width="inputWidth"
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
                        @change="p_show = false"/>
                <pl-date-single-panel
                        v-else
                        :value="p_value"

                        :display-format="p_df"
                        :value-format="p_vf"
                        :max-date="p_maxDate"
                        :min-date="p_minDate"
                        :view="view"

                        @input="p_valueChange"/>
            </div>
        </pl-popover>
    </div>
</template>

<script>
    import PlDatePanel from "./pl-date-panel";
    import {BoxMixin, InputMixin} from "../../mixin/component-mixin";
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
            inputWidth: {type: Number, default: 256},
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
            },
        },
        data() {
            return {
                p_watchCurrentValue: false,
                p_value: this.value,
                p_start: this.start,
                p_end: this.end,
                p_show: this.show,
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
                    return `${this.$plain.$utils.dateFormat(this.$plain.$utils.dateParse(this.p_start, this.p_vf), this.p_df)} ~ ${this.$plain.$utils.dateFormat(this.$plain.$utils.dateParse(this.p_end, this.p_vf), this.p_df)}`
                }
            },
            p_maxDate() {
                if (!this.max) return null
                const date = this.$plain.$utils.dateParse(this.max, this.p_vf)

                if (this.view === 'year') {
                    date.setMonth(0)
                    date.setDate(0)
                }
                if (this.view === 'month') {
                    date.setDate(0)
                }

                date.setHours(23)
                date.setMinutes(59)
                date.setSeconds(59)
                return date
            },
            p_minDate() {
                if (!this.min) return null
                const date = this.$plain.$utils.dateParse(this.min, this.p_vf)

                if (this.view === 'year') {
                    date.setMonth(0)
                    date.setDate(0)
                }
                if (this.view === 'month') {
                    date.setDate(0)
                }

                date.setHours(23)
                date.setMinutes(59)
                date.setSeconds(59)
                return date
            },
        },
        methods: {
            p_valueChange(val) {
                this.p_value = val
                this.p_show = false
            },
            p_clear() {
                this.p_value = null
                this.p_start = null
                this.p_end = null
                this.p_show = false
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
    }
</style>