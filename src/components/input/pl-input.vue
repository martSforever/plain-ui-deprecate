<template>
    <pl-box class="pl-input"
            :class="{'pl-input-focus':isFocus}"
            v-bind="boxBinding"
            :hover="hover || focusOnHover"
            :value="currentValue"
            @clear="!loading && p_clear()"
            @enter="()=>{$emit('enter-box');!!this.focusOnHover && this.$refs.input.focus()}"
    >
        <slot name="prepend"></slot>
        <input ref="input"
               :type="type"
               class="pl-input-el"
               :value="currentValue"
               :disabled="disabled"
               :readonly="readonly || loading"
               :placeholder="placeholder"
               @input="p_input"
               @focus="p_focus"
               @blur="p_blur"
               @keyup.enter="e=>$emit('enter', e)"
               @keyup.up="e=>$emit('up', e)"
               @keyup.down="e=>$emit('down', e)"
               @keyup.left="e=>$emit('left', e)"
               @keyup.right="e=>$emit('right', e)"
               @keyup.esc="e=>$emit('esc', e)"
               @keyup.space="e=>$emit('space', e)"

               @click="e=>$emit('click', e)"
        >
        <slot name="append"></slot>
    </pl-box>
</template>

<script>
    import PlBox from "../box/pl-box";
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
        name: "pl-input",
        components: {PlBox},
        mixins: [InputMixin],
        props: {},
        data() {
            return {
                p_timer: null,
                isFocus: false,
                p_watchCurrentValue: false,
            }
        },
        methods: {
            p_clear() {
                this.$emit('clear')
                if (!this.readonly && !this.disabled && !!this.defaultClear) {
                    this.currentValue = null
                    this.$emit('input', null)
                }
            },
            p_input({target: {value}}) {
                !!this.replaceRegexp && (value = this.p_replaceRegexp(value))
                this.currentValue = value
                this.$emit('input', value)
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
                this.$refs.input._keydown = e => keyMap[event.keyCode] != null && this.$emit(keyMap[event.keyCode], e)
                this.$refs.input.addEventListener('keydown', this.$refs.input._keydown)
            }
        },
        beforeDestroy() {
            !!this.keyboard && this.$refs.input.removeEventListener('keydown', this.$refs.input._keydown)
        },
    }
</script>