<template>
    <pl-popover
            class="pl-time"
            v-model="p_show"
            v-bind="popoverBinding"
            :trigger="!readonly && !disabled ?trigger:null"
            :height="208"
            :width="150"
            :disabled-equal="disabledEqual">

        <slot :value="currentValue">
            <pl-input
                    v-bind="inputBinding"
                    :value="currentValue"
                    clearIcon="pl-time-circle-light"
                    :readonly="inputReadonly"
                    :width="inputWidth"
                    :defaultClear="false"
                    :placeholder="placeholder"
                    @clear="e=>!readonly && !disabled && p_clear(e)"
            />
        </slot>
        <pl-time-panel slot="popper" v-model="currentValue" :max="max" :min="min" ref="panel" @clickLabel="p_clickLabel"/>
    </pl-popover>
</template>

<script>
    import PlTimePanel from "./pl-time-panel";
    import PlPopover from "../popper/pl-popover";
    import {InputMixin} from "../../mixin/component-mixin";
    import PlInput from "../input/pl-input";
    import {PopoverMixin} from "../popper";

    export default {
        name: "pl-time",
        components: {PlInput, PlPopover, PlTimePanel},
        mixins: [InputMixin, PopoverMixin],
        props: {
            max: {type: String},                                                    //最大值
            min: {tyoe: String},                                                    //最小值
            show: {type: Boolean},                                                  //打开下拉框，双向绑定属性
            disabledEqual: {default: true},

            inputWidth: {type: Number, default: 200},                               //输入框宽度
            inputReadonly: {default: true},                                         //输入框默认只读
        },
        watch: {
            show(val) {
                this.p_show !== val && (this.p_show = val)
            },
            p_show(val) {
                this.show !== val && this.$emit('update:show', val)
                this.$emit(val ? 'show' : 'hide')
            },
        },
        data() {
            return {
                p_show: this.show,
            }
        },
        methods: {
            p_clear() {
                this.currentValue = null
            },
            async p_clickLabel() {
                this.p_show = false
                await this.$plain.nextTick()
                this.$emit('confirm', this.currentValue)
            },
        },
    }
</script>