<template>
    <div class="pl-toggle" :class="classes" @click="p_click" @mousedown="p_mousedown" @mouseup="p_mouseup">
        <div class="pl-toggle-circle"></div>
    </div>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-toggle",
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
                    `pl-toggle-color-${this.color}`,
                    `pl-toggle-size-${this.size}`,
                    {
                        'pl-toggle-on': !!this.on,
                        'pl-toggle-active': this.p_active,
                        'pl-toggle-readonly': this.readonly,
                        'pl-toggle-disabled': this.disabled,
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
    .pl-toggle {
        background-color: #f2f2f2;
        position: relative;
        transition: background-color .3s;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;

        @each $key, $value in $list-size {
            &.pl-toggle-size-#{$key} {
                height: $value;
                width: $value*52/32;
                border-radius: $p-shape-round;
                &.pl-toggle-on {
                    .pl-toggle-circle {
                        left: $value/2+6;
                    }
                }
                .pl-toggle-circle {
                    right: $value/2+6;
                    border-radius: $p-shape-round;
                }

                &.pl-toggle-active {
                    .pl-toggle-circle {
                        right: $value/2;
                    }
                    &.pl-toggle-on .pl-toggle-circle {
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
        &.pl-toggle-on {
            &:before {
                transform: scale3d(0, 0, 0);
            }
            .pl-toggle-circle {
                right: 2px;
            }
            @each $key, $value in $list-color {
                &.pl-toggle-color-#{$key} {
                    background-color: $value;
                }
                &.pl-toggle-disabled {
                    background-color: $p-color-info;
                }
            }
        }
        .pl-toggle-circle {
            position: absolute;
            left: 2px;
            top: 2px;
            bottom: 2px;
            background: white;
            box-shadow: 0 3px 12px rgba(0, 0, 0, .16), 0 3px 1px rgba(0, 0, 0, .1);
            transition: all 0.3s;
        }
        &.pl-toggle-active {
            .pl-toggle-circle {
                left: 2px;
            }
            &.pl-toggle-on .pl-toggle-circle {
                right: 2px;
            }
        }
    }
</style>
