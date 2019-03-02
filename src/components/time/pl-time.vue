<template>
    <pl-popover
            class="pl-time"
            v-model="currentShow"
            :trigger="!readonly && !disabled ?trigger:null"
            :disabled-hide-on-click-outside="disabledHideOnClickOutside"
            :disabled-destroy-on-hide="disabledDestroyOnHide"
            :direction="direction"
            :animate="animate"
            :arrow="arrow"
            :offset="offset"
            :height="208"
            :width="150"
            :disabled-equal="disabledEqual">

        <pl-input
                :value="currentValue"
                :box-type="boxType"
                :box-color="boxColor"
                :box-size="boxSize"
                :box-shape="boxShape"
                :suffix-icon="suffixIcon"
                :prefix-icon="prefixIcon"
                :clear-icon="'pl-time'"
                :clearable="clearable"
                :loading="loading"
                :readonly="inputReadonly"
                :disabled="disabled"
                :padding="padding"
                :long="long"
                :width="inputWidth"
                :hover="hover"
                :required="required"
                :rules="rules"
                :valid-on-init="validOnInit"

                :default-clear="false"
                :placeholder="placeholder"
                @clear="e=>!readonly && !disabled && p_clear(e)"
        />
        <pl-time-panel slot="popper" v-model="currentValue" :max="max" :min="min"/>
    </pl-popover>
</template>

<script>
    import PlTimePanel from "./pl-time-panel";
    import PlPopover from "../popper/pl-popover";
    import {BoxMixin, InputMixin} from "../../mixin/component-mixin";
    import PlInput from "../input/pl-input";

    export default {
        name: "pl-time",
        components: {PlInput, PlPopover, PlTimePanel},
        mixins: [BoxMixin, InputMixin],
        props: {
            max: {type: String},                                                    //最大值
            min: {tyoe: String},                                                    //最小值

            show: {type: Boolean},                                                  //打开下拉框，双向绑定属性

            trigger: {type: String, default: 'click'},                              //触发的动作：hover|click
            disabledHideOnClickOutside: {type: Boolean},                            //禁用点击外部的时候关闭弹出框
            disabledDestroyOnHide: {type: Boolean, default: true},                  //禁用隐藏的时候销毁内容
            direction: {type: String, default: 'bottom'},                           //弹出框的方向：top|bottom|left|right
            align: {type: String, default: 'start'},                                //弹出框的对其方式
            animate: {type: String, default: 'drop'},                               //弹出框显隐动画
            arrow: {type: Boolean},                                                 //弹出框是否带小三角
            offset: {type: Number},                                                 //弹出框与载体的距离
            height: {type: Number, default: 180},                                   //弹出框的高度
            width: {type: Number, default: 180},                                    //弹出框的宽度
            disabledEqual: {type: Boolean, default: true},                          //弹出框是否与载体在方向上大小相同

            inputWidth: {type: Number, default: 256},                               //输入框宽度
            inputReadonly: {default: true},                                         //输入框默认只读
        },
        data() {
            return {
                currentShow: this.show,
            }
        },
        methods: {
            p_clear() {
                this.currentValue = null
            },
        },
    }
</script>

<style lang="scss">

</style>