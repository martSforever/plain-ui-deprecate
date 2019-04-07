<template>
    <pl-input ref="input"
              class="pl-number"
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
              @up="p_add"
              @down="p_subtract"
              @input="p_input"
              @clear="e=>$emit('clear',e)"
              @click="e=>$emit('click',e)"
    >
        <div slot="append" class="pl-number-controller" v-if="!noController">
            <link-icon class="pl-number-icon-up" icon="pl-triangle-up-fill" @click.stop="e=>!disabled&&!readonly&&p_add(e)"/>
            <link-icon class="pl-number-icon-down" icon="pl-triangle-down-fill" @click.stop="e=>!disabled&&!readonly&&p_subtract(e)"/>
        </div>
    </pl-input>
</template>

<script>
    import PlInput from "../input/pl-input";
    import {BoxMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-number",
        components: {PlInput},
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
                p_timer: null,
            }
        },
        methods: {
            p_add() {
                let val = this.currentValue == null ? 0 : this.currentValue - 0
                val += this.step
                val = this.p_validate(val)
                this.currentValue = val
            },
            p_subtract() {
                let val = this.currentValue == null ? 0 : this.currentValue - 0
                val -= this.step
                val = this.p_validate(val)
                this.currentValue = val
            },
            p_input(val) {
                if (!!this.p_timer) {
                    clearTimeout(this.p_timer)
                    this.p_timer = null
                }
                this.p_timer = setTimeout(() => {
                    this.currentValue = this.p_validate(val)
                    this.$refs.input.resetValue(this.currentValue)
                }, 200)
            },
            p_validate(val) {
                if (val == null || val === '') return null
                if (this.max != null && val - 0 > this.max) return this.max
                if (this.min != null && val - 0 < this.min) return this.min
                return val
            },
        }
    }
</script>

<style lang="scss">
    .pl-number {
        .pl-number-controller {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            flex-direction: column;
            cursor: pointer;
            width: var(--p-icon-size);
            user-select: none;
            .pl-icon:active {
                background-color: #f2f2f2;
            }
            .pl-icon:not(:last-child) {
                margin-bottom: 1px;
            }

            .pl-number-icon-up, .pl-number-icon-down {
                position: relative;
            }
            .pl-number-icon-up {
                top: 3px;
            }
            .pl-number-icon-down {
                bottom: 3px;
            }
        }
        @each $key, $value in $list-size {
            &.pl-box-size-#{$key} {
                .pl-number-controller {
                    font-size: $value/3.5;
                    transform: scale(0.7);
                }
            }
        }
    }
</style>