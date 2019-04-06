<template>
    <pl-popover
            class="pl-select"
            v-model="currentShow"
            :disabled="readonly || disabled"
            v-bind="popoverBinding">
        <pl-input
                :value="showValue"
                v-bind="inputBinding"
                :clearIcon="p_suffixIcon"
                :readonly="inputReadonly"
                :width="inputWidth"
                :defaultClear="false"
                @clear="e=>!readonly && !disabled && p_clear(e)"
        />
        <pl-scroll :scroll-x="false" slot="popper">
            <div class="pl-select-content">
                <div class="link-select-item" :class="{'link-select-item-active':item.checked}" v-for="(item,index) in p_data" :label="item.label" :value="item.value" :key="index"
                     @click="p_click(item,index)">
                    <slot :item="item.item" :index="index" :checked="item.checked">
                        <pl-radio :value="item.checked" readonly style="margin-right: 0.5em" inactive-icon="pl-square-light" v-if="multiple"/>
                        <span>{{item.label}}</span>
                    </slot>
                </div>
            </div>
        </pl-scroll>
    </pl-popover>
</template>

<script>
    import PlPopover from "../popper/pl-popover";
    import PlInput from "../input/pl-input";
    import {BoxMixin, InputMixin} from "../../mixin/component-mixin";
    import PlIcon from "../icon/pl-icon";
    import PlScroll from "../scroll/pl-scroll";
    import {PopoverMixin} from "../popper";
    import PlRadio from "../radio/pl-radio";

    export default {
        name: "pl-select",
        mixins: [BoxMixin, InputMixin, PopoverMixin],
        components: {PlRadio, PlScroll, PlIcon, PlInput, PlPopover},
        props: {
            show: {type: Boolean},                                                  //打开下拉框，双向绑定属性
            multiple: {type: Boolean},                                              //是否多选

            data: {type: Array},                                                    //下拉选项数组
            labelKey: {type: String},                                               //显示值key
            valueKey: {type: String},                                               //值key

            inputWidth: {type: Number, default: 200},                               //输入框宽度
            inputReadonly: {default: true},                                         //输入框默认只读
        },
        watch: {
            value(val) {
                if (!!this.multiple && this.p_multipleValue !== val) this.p_multipleValue = this.$plain.$utils.deepCopy(val)
                else if (this.p_singleValue !== val) this.p_singleValue = val
                this.p_reset();
            },
            p_multipleValue(val) {
                if (JSON.stringify(val) !== JSON.stringify(this.value)) this.$emit('input', val);
            },
            p_singleValue(val) {
                this.$emit('input', val);
            },
            show(val) {
                if (this.currentShow !== val) this.currentShow = val
            },
            currentShow(val) {
                this.$emit('update:show', val)
            },
            data() {
                this.p_reset()
            },
            labelKey() {
                this.p_reset()
            },
            valueKey() {
                this.p_reset()
            },
        },
        data() {
            return {
                currentShow: this.show,
                p_selectItems: [],
                p_singleValue: this.value,
                p_multipleValue: this.$plain.$utils.deepCopy(this.value) || [],
                p_data: null,
            }
        },
        computed: {
            p_suffixIcon() {
                return this.currentShow ? 'pad-up' : 'pad-down'
            },
            showValue() {
                return this.p_data.reduce((ret, item) => {
                    !!item.checked && ret.push(item.label)
                    return ret
                }, []).join(',')
            },
        },
        created() {
            this.p_reset()
        },
        methods: {
            p_clear() {
                this.multiple ? (this.p_multipleValue = []) : (this.p_singleValue = null)
                this.p_data.forEach(item => item.checked = false)
            },
            p_reset() {
                const list = this.data || []
                this.p_data = list.map((item, index) => {
                    const label = !!this.labelKey ? item[this.labelKey] : item
                    const value = !!this.valueKey ? item[this.valueKey] : item
                    return {
                        item: list[index],
                        label,
                        value,
                        checked: !this.multiple ? (value === this.p_singleValue) : this.$plain.$utils.oneOf(value, this.p_multipleValue),
                    }
                })
            },
            p_click(item, index) {
                if (!this.multiple) {
                    this.p_data.forEach(i => i.checked = false)
                    this.p_singleValue = item.value;
                    item.checked = true
                    this.currentShow = false
                } else {
                    item.checked = !item.checked
                    !!item.checked ? this.p_multipleValue.push(item.value) : this.$plain.$utils.removeFromArray(this.p_multipleValue, item.value);
                }
                this.$emit('click', {item, index})
                this.$emit('select', !!this.multiple ? this.p_multipleValue : this.p_singleValue)
            },
        }
    }
</script>

<style lang="scss">
    .pl-select {
        @include public-style;
        display: inline-block;
        cursor: pointer;
    }

    .pl-select-content {
        @include public-style;
        padding: 6px 0;
        .link-select-item {
            font-size: 12px;
            height: 28px;
            padding: 0 12px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &.link-select-item-active {
                background-color: var(--p-color-primary-light);
            }
            &:hover {
                background-color: var(--p-color-primary-light);
                cursor: pointer;
            }
        }
    }


</style>