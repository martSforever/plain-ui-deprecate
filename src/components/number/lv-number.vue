<template>
    <lv-input ref="input"
              class="lv-number"
              :value="currentValue"
              :box-type="boxType"
              :box-shape="boxShape"
              :box-size="boxSize"
              :box-color="boxColor"
              :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :clear-icon="null"
              :loading="loading"
              :readonly="readonly"
              :disabled="disabled"
              :padding="padding"
              :long="long"
              :width="width"
              :required="required"
              :rules="rules"
              :valid-on-init="validOnInit"
              :replace-regexp="replaceRegexp"
              :type="type"
              :focus-on-hover="focusOnHover"
              :default-clear="false"
              :placeholder="placeholder"
              keyboard
              @up="lv_add"
              @down="lv_subtract"
              @input="lv_input"
              @clear="e=>$emit('clear',e)"
              @click="e=>$emit('click',e)"
    >
        <div slot="append" class="lv-number-controller" v-if="!noController">
            <link-icon icon="lv-triangle-up-fill" @click.stop="e=>!disabled&&!readonly&&lv_add(e)"/>
            <link-icon icon="lv-triangle-down-fill" @click.stop="e=>!disabled&&!readonly&&lv_subtract(e)"/>
        </div>
    </lv-input>
</template>

<script>
    import LvInput from "../input/lv-input";
    import {BoxMixin} from "../../mixin/component-mixin";

    export default {
        name: "lv-number",
        components: {LvInput},
        mixins: [BoxMixin],
        props: {
            boxType: {default: 'line'},
            boxColor: {default: 'info'},
            clearIcon: {default: 'none'},
            replaceRegexp: {type: RegExp, default: () => /[^\-0-9.]/g},
            type: {type: String, default: 'text'},
            focusOnHover: {type: Boolean},
            defaultClear: {type: Boolean, default: true},
            placeholder: {type: String, default: '请输入数字...'},

            step: {type: Number, default: 1},
            min: {type: Number},
            max: {type: Number},
            noController: {type: Boolean,},
        },
        data() {
            return {
                lv_timer: null,
            }
        },
        methods: {
            lv_add() {
                let val = this.currentValue == null ? 0 : this.currentValue - 0
                val += this.step
                val = this.lv_validate(val)
                this.currentValue = val
            },
            lv_subtract() {
                let val = this.currentValue == null ? 0 : this.currentValue - 0
                val -= this.step
                val = this.lv_validate(val)
                this.currentValue = val
            },
            lv_input(val) {
                if (!!this.lv_timer) {
                    clearTimeout(this.lv_timer)
                    this.lv_timer = null
                }
                this.lv_timer = setTimeout(() => {
                    this.currentValue = this.lv_validate(val)
                    this.$refs.input.resetValue(this.currentValue)
                }, 200)
            },
            lv_validate(val) {
                if (val == null || val === '') return null
                if (this.max != null && val - 0 > this.max) return this.max
                if (this.min != null && val - 0 < this.min) return this.min
                return val
            },
        }
    }
</script>

<style lang="scss">
    .lv-number {
        padding-right: 0 !important;
        .lv-number-controller {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            flex-direction: column;
            cursor: pointer;
            width: 2*$icon-size;
            .lv-icon:active {
                background-color: #f2f2f2;
            }
            .lv-icon:not(:last-child) {
                margin-bottom: 1px;
            }
        }
        @each $key, $value in $list-size {
            &.lv-box-size-#{$key} {
                .lv-number-controller {
                    font-size: $value/3.5;
                    transform: scale(0.7);
                }
            }
        }
    }
</style>