<template>
    <div class="lv-select">
        <lv-popover
                v-model="currentShow"
                :trigger="!readonly && !disabled ?trigger:null"
                :disabled-hide-on-click-outside="disabledHideOnClickOutside"
                :disabled-destroy-on-hide="disabledDestroyOnHide"
                :direction="direction"
                :animate="animate"
                :arrow="arrow"
                :offset="offset"
                :height="height"
                :width="width"
                :disabled-equal="disabledEqual">
            <lv-input
                    :value="showValue"
                    :box-type="boxType"
                    :box-color="boxColor"
                    :box-size="boxSize"
                    :box-shape="boxShape"
                    :suffix-icon="suffixIcon"
                    :prefix-icon="prefixIcon"
                    :clear-icon="lv_suffixIcon"
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
                    @clear="e=>!readonly && !disabled && lv_clear(e)"
            />
            <lv-scroll :scroll-x="false" slot="popper">
                <div class="lv-select-content">
                    <div class="link-select-item" v-for="(item,index) in lv_data" :label="item.label" :value="item.value" :key="index" @click="lv_click(item,index)">
                        <slot :item="item.item" :index="index" :checked="item.checked">
                            <span>{{item.label}}</span>
                            <lv-icon icon="lv-check" v-if="item.checked"/>
                        </slot>
                    </div>
                </div>
            </lv-scroll>
        </lv-popover>
    </div>
</template>

<script>
    import LvPopover from "../popper/lv-popover";
    import LvInput from "../input/lv-input";
    import {BoxMixin, InputMixin} from "../../mixin/component-mixin";
    import LvIcon from "../icon/lv-icon";
    import LvScroll from "../scroll/lv-scroll";

    export default {
        name: "lv-select",
        mixins: [BoxMixin, InputMixin],
        components: {LvScroll, LvIcon, LvInput, LvPopover},
        props: {
            show: {type: Boolean},                                                  //打开下拉框，双向绑定属性
            multiple: {type: Boolean},                                              //是否多选

            data: {type: Array},                                                    //下拉选项数组
            labelKey: {type: String},                                               //显示值key
            valueKey: {type: String},                                               //值key

            trigger: {type: String, default: 'click'},                              //触发的动作：hover|click
            disabledHideOnClickOutside: {type: Boolean},                            //禁用点击外部的时候关闭弹出框
            disabledDestroyOnHide: {type: Boolean},                                 //禁用隐藏的时候销毁内容
            direction: {type: String, default: 'bottom'},                           //弹出框的方向：top|bottom|left|right
            align: {type: String, default: 'start'},                                //弹出框的对其方式
            animate: {type: String, default: 'drop'},                               //弹出框显隐动画
            arrow: {type: Boolean},                                                 //弹出框是否带小三角
            offset: {type: Number},                                                 //弹出框与载体的距离
            height: {type: Number, default: 180},                                   //弹出框的高度
            width: {type: Number, default: 180},                                    //弹出框的宽度
            disabledEqual: {type: Boolean},                                         //弹出框是否与载体在方向上大小相同

            inputWidth: {type: Number, default: 256},                               //输入框宽度
            inputReadonly: {default: true},                                         //输入框默认只读
        },
        watch: {
            value(val) {
                if (!!this.multiple && this.lv_multipleValue !== val) this.lv_multipleValue = this.$plain.$utils.deepCopy(val)
                else if (this.lv_singleValue !== val) this.lv_singleValue = val
                this.lv_reset();
            },
            lv_multipleValue(val) {
                if (JSON.stringify(val) !== JSON.stringify(this.value)) this.$emit('input', val);
            },
            lv_singleValue(val) {
                this.$emit('input', val);
            },
            show(val) {
                if (this.currentShow !== val) this.currentShow = val
            },
            currentShow(val) {
                this.$emit('update:show', val)
            },
            data() {
                this.lv_reset()
            },
            labelKey() {
                this.lv_reset()
            },
            valueKey() {
                this.lv_reset()
            },
        },
        data() {
            return {
                currentShow: this.show,
                lv_selectItems: [],
                lv_singleValue: this.value,
                lv_multipleValue: this.$plain.$utils.deepCopy(this.value) || [],
                lv_data: null,
            }
        },
        computed: {
            lv_suffixIcon() {
                return this.currentShow ? 'lv-arrow-up' : 'lv-arrow-down'
            },
            showValue() {
                return this.lv_data.reduce((ret, item) => {
                    !!item.checked && ret.push(item.label)
                    return ret
                }, []).join(',')
            },
        },
        created() {
            this.lv_reset()
        },
        methods: {
            lv_clear() {
                this.multiple ? (this.lv_multipleValue = []) : (this.lv_singleValue = null)
                this.lv_data.forEach(item => item.checked = false)
            },
            lv_reset() {
                const list = this.data || []
                this.lv_data = list.map((item, index) => {
                    const label = !!this.labelKey ? item[this.labelKey] : item
                    const value = !!this.valueKey ? item[this.valueKey] : item
                    return {
                        item: list[index],
                        label,
                        value,
                        checked: !this.multiple ? (value === this.lv_singleValue) : this.$plain.$utils.oneOf(value, this.lv_multipleValue),
                    }
                })
            },
            lv_click(item, index) {
                if (!this.multiple) {
                    this.lv_data.forEach(i => i.checked = false)
                    this.lv_singleValue = item.value;
                    item.checked = true
                    this.currentShow = false
                } else {
                    item.checked = !item.checked
                    !!item.checked ? this.lv_multipleValue.push(item.value) : this.$plain.$utils.removeFromArray(this.lv_multipleValue, item.value);
                }
                this.$emit('click', {item, index})
                this.$emit('select', !!this.multiple ? this.lv_multipleValue : this.lv_singleValue)
            },
        }
    }
</script>

<style lang="scss">
    .lv-select {
        @include public-style;
        display: inline-block;
        cursor: pointer;

    }

    .lv-select-content {
        @include public-style;
        padding: 6px 0;
        .link-select-item {
            font-size: 12px;
            height: 28px;
            line-height: 28px;
            padding: 0 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:hover {
                background-color: $color-primary-light;
                cursor: pointer;
            }
        }
    }


</style>