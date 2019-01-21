<template>
    <lv-box class="lv-input"
            :class="{'lv-input-focus':isFocus}"
            :box-type="boxType"
            :box-color="boxColor"
            :box-shape="boxShape"
            :box-size="boxSize"
            :prefix-icon="prefixIcon"
            :suffix-icon="suffixIcon"
            :clear-icon="clearIcon"
            :loading="loading"
            :icon-only="iconOnly"
            :readonly="readonly"
            :disabled="disabled"
            :padding="padding"
            :long="long"
            :width="width"
            :hover="hover || focusOnHover"
            :value="currentValue"
            :required="required"
            :rules="rules"
            :valid-on-init="validOnInit"
            @clear="p_clear"
            @enter="()=>{$emit('enter');!!this.focusOnHover && this.$refs.input.focus()}"
    >
        <slot name="prepend"></slot>
        <input ref="input"
               :type="type"
               class="lv-input-el"
               :value="currentValue"
               :disabled="disabled"
               :readonly="readonly"
               :placeholder="placeholder"
               @input="p_input"
               @focus="p_focus"
               @blur="p_blur"
               @click="e=>$emit('click', e)"
        >
        <slot name="append"></slot>
    </lv-box>
</template>

<script>
    import LvBox from "../box/lv-box";
    import {BoxMixin, InputMixin} from "../../mixin/component-mixin";

    const keyMap = {
        8: 'back',
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    }

    export default {
        name: "lv-input",
        components: {LvBox},
        mixins: [BoxMixin, InputMixin],
        props: {},
        data() {
            return {
                p_timer: null,
                isFocus: false,
            }
        },
        methods: {
            p_clear() {
                this.$emit('clear')
                !this.readonly && !this.disabled && !!this.defaultClear && (this.currentValue = null)
            },
            p_input({target: {value}}) {
                this.currentValue = value
                !!this.replaceRegexp && this.p_replaceRegexp(value)
            },
            p_focus(e) {
                this.isFocus = true
                this.$emit('focus', e)
            },
            p_blur(e) {
                this.isFocus = false
                this.$emit('blur', e)
            },
            p_replaceRegexp(val) {
                if (!!this.p_timer) {
                    clearTimeout(this.p_timer)
                    this.p_timer = null
                }
                this.p_timer = setTimeout(() => {
                    this.currentValue = val.replace(this.replaceRegexp, '');
                    clearTimeout(this.p_timer)
                    this.p_timer = null
                }, 50)
            },
            resetValue(val) {
                this.currentValue = val
            },
        },
        mounted() {
            if (!!this.keyboard) {
                this.$refs.input._keydown = e => keyMap[event.keyCode] != null && this.$emit(keyMap[event.keyCode])
                this.$refs.input.addEventListener('keydown', this.$refs.input._keydown)
            }
        },
        beforeDestroy() {
            !!this.keyboard && this.$refs.input.removeEventListener('keydown', this.$refs.input._keydown)
        },
    }
</script>

<style lang="scss">
    .lv-input {
        @include transition-all;
        .lv-box-content {
            display: inline-flex;
            .lv-input-el {
                flex: 1;
                border: none;
                background: transparent;
                outline: none;
                &::placeholder {
                    color: $color-normal-placeholder;
                }
                &::-ms-clear {
                    display: none;
                }
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none !important;
                    margin: 0;
                }

            }
        }
        .lv-input-prepend, .lv-input-append {
            height: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        &.lv-input-focus {
            /*fill type*/
            &.lv-box-type-line {
                border-color: $color-primary;
            }
            &.lv-box-invalid {
                border-color: $color-error;
            }
        }
    }
</style>