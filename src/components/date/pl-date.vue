<template>
    <div class="pl-date">
        <!--<pl-date-panel/>-->
        pl-date
    </div>
</template>

<script>
    import PlDatePanel from "./pl-date-panel";
    import {BoxMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-date",
        components: {PlDatePanel},
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
        data() {
            return {
                p_watchCurrentValue: false,
                p_value: this.value,
                p_start: this.start,
                p_end: this.end,
            }
        },
    }
</script>

<style lang="scss">

</style>