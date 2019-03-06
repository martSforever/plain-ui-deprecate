<template>
    <div class="pl-date">
        <pl-date-single-panel
                v-model="p_value"
                :max="max"
                :min="min"
                :display-format="p_df"
                :value-format="p_vf"/>
    </div>
</template>

<script>
    import PlDatePanel from "./pl-date-panel";
    import {BoxMixin} from "../../mixin/component-mixin";
    import {DateUtil} from "./index";
    import PlDateSinglePanel from "./pl-date-single-panel";

    export default {
        name: "pl-date",
        components: {PlDateSinglePanel, PlDatePanel},
        mixins: [BoxMixin],
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
        },
    }
</script>

<style lang="scss">
    .pl-date {

    }
</style>