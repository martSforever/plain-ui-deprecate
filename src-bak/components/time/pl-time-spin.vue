<template>
    <div class="pl-time-spin">
        <pl-scroll-option :data="data"
                          label-key="val"
                          value-key="val"
                          disabled-key="disabled"
                          :width="width"
                          :value="currentValue"
                          :shadow="false"
                          @input="p_input"/>
    </div>
</template>

<script>
    import PlScrollOption from "../scroll-option/pl-scroll-option";
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-time-spin",
        components: {PlScrollOption},
        mixins: [ValueMixin],
        props: {
            num: {type: Number,},
            width: {},
            max: {},
            min: {},
        },
        data() {
            return {
                p_watchCurrentValue: false,
            }
        },
        computed: {
            data() {
                const ret = []
                let i = 0
                while (i < this.num) {
                    ret.push({
                        val: i,
                        disabled: !((this.min == null || i >= this.min) && (this.max == null || i <= this.max)),
                    })
                    i++
                }
                return ret
            },
        },
        methods: {
            p_input(val) {
                this.currentValue = val
                this.$emit('change', val)
                this.$emit('input', val)
            },
        }
    }
</script>