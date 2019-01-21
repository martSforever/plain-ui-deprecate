<template>
    <div class="lv-toggle" :class="classes" @click="p_click" @mousedown="p_mousedown" @mouseup="p_mouseup">
        <div class="lv-toggle-circle"></div>
    </div>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "lv-toggle",
        mixins: [ValueMixin],
        props: {
            size: {type: String, default: 'default'},                   //大小
            color: {type: String, default: 'primary'},                  //颜色
            readonly: {type: Boolean},                                  //是否只读
            disabled: {type: Boolean},                                  //是否禁用

            trueValue: {default: true},                                 //激活的时候的实际值
            falseValue: {default: false},                               //未激活的时候的实际值
        },
        data() {
            return {
                p_active: false,
            }
        },
        computed: {
            on() {
                return this.currentValue === this.trueValue
            },
            classes() {
                return [
                    `lv-toggle-color-${this.color}`,
                    `lv-toggle-size-${this.size}`,
                    {
                        'lv-toggle-on': !!this.on,
                        'lv-toggle-active': this.p_active,
                        'lv-toggle-readonly': this.readonly,
                        'lv-toggle-disabled': this.disabled,
                    }
                ]
            },
        },
        methods: {
            p_click() {
                if (this.readonly || this.disabled) return
                this.currentValue = !this.on ? this.trueValue : this.falseValue
            },
            p_mousedown() {
                this.p_active = true
            },
            p_mouseup() {
                this.p_active = false
            },
        },
    }
</script>

<style lang="scss">
    .lv-toggle {
        background-color: #f2f2f2;
        position: relative;
        transition: background-color .3s;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;

        @each $key, $value in $list-size {
            &.lv-toggle-size-#{$key} {
                height: $value;
                width: $value*52/32;
                border-radius: $value/2;
                &.lv-toggle-on {
                    .lv-toggle-circle {
                        left: $value/2+6;
                    }
                }
                .lv-toggle-circle {
                    right: $value/2+6;
                    border-radius: $value/2-2;
                }

                &.lv-toggle-active {
                    .lv-toggle-circle {
                        right: $value/2;
                    }
                    &.lv-toggle-on .lv-toggle-circle {
                        left: $value/2;
                    }
                }
            }
        }

        &:before {
            position: absolute;
            left: 2px;
            right: 2px;
            top: 2px;
            bottom: 2px;
            border-radius: 16px;
            background-color: #fff;
            content: "";
            /*transform: scale3d(1, 1, 1);*/
            transform: scaleX(1);
            transition: transform .3s;
        }
        &.lv-toggle-on {
            &:before {
                transform: scale3d(0, 0, 0);
            }
            .lv-toggle-circle {
                right: 2px;
            }
            @each $key, $value in $list-color {
                &.lv-toggle-color-#{$key} {
                    background-color: $value;
                }
                &.lv-toggle-disabled {
                    background-color: $color-info;
                }
            }
        }
        .lv-toggle-circle {
            position: absolute;
            left: 2px;
            top: 2px;
            bottom: 2px;
            background: white;
            box-shadow: 0 3px 12px rgba(0, 0, 0, .16), 0 3px 1px rgba(0, 0, 0, .1);
            transition: all 0.3s;
        }
        &.lv-toggle-active {
            .lv-toggle-circle {
                left: 2px;
            }
            &.lv-toggle-on .lv-toggle-circle {
                right: 2px;
            }
        }
    }
</style>
