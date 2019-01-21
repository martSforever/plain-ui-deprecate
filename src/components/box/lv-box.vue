<template>
    <div class="lv-box" :class="classes" :style="{width:!!width&&!long&&!iconOnly?`${width}px`:null}"
         @click="e=>!readonly && !disabled && $emit('click',e)"
    >
        <lv-icon v-if="!!prefixIcon" :icon="prefixIcon" class="lv-box-prefix-icon"/>
        <lv-icon v-if="!!loading" icon="lv-loading" loading/>
        <div class="lv-box-content" v-if="!iconOnly">
            <slot></slot>
        </div>
        <lv-icon v-if="!!suffixIcon" :icon="suffixIcon" class="lv-box-suffix-icon"/>
        <lv-icon v-if="!!clearIcon" :icon="hovering&&value!=null ?'lv-close':clearIcon" @click.stop.prevent="e=>$emit('clear',e)" class="lv-box-clear-icon"/>
        <div class="lv-box-tooltip" v-show="!!passValidMsg && passValidMsg!=='必填'">
            <span>{{passValidMsg}}</span>
        </div>
    </div>
</template>

<script>
    import LvIcon from "../icon/lv-icon";

    export default {
        name: "lv-box",
        components: {LvIcon},
        props: {
            boxType: {type: String, default: 'fill',},                      //盒子类型
            boxColor: {type: String, default: 'primary'},                   //盒子颜色
            boxShape: {type: String, default: 'none'},                      //盒子形状
            boxSize: {type: String, default: 'default'},                    //盒子大小

            prefixIcon: {type: String},                                     //前置图标
            suffixIcon: {type: String},                                     //后置图标
            clearIcon: {type: String},                                      //清除图标，当该属性存在时，hover自动为true，当value有值并且hovering时，显示lv-close，否则显示clearIcon
            loading: {type: Boolean},                                       //loading 图标
            iconOnly: {type: Boolean},                                      //只有图标，设置为true则盒子宽高相等，并且为圆形

            readonly: {type: Boolean},                                      //只读
            disabled: {type: Boolean},                                      //禁用（颜色变为disabled）

            padding: {type: Boolean, default: true},                        //左右边距
            long: {type: Boolean,},                                         //长按钮
            width: {type: Number, default: 200},                            //盒子宽度
            hover: {type: Boolean},                                         //是否监听鼠标hover事件

            value: {},                                                      //当前值
            required: {type: Boolean},                                      //是否必输
            rules: {type: Array},                                           //校验规则
            validOnInit: {type: Boolean},                                   //是否在初始化的时候进行校验
        },
        watch: {
            value() {
                this.validate()
            },
            required() {
                this.validate()
            },
        },
        data() {
            return {
                passValid: null,
                passValidMsg: null,
                hovering: false,
            }
        },
        computed: {
            classes() {
                return [
                    {
                        'lv-box-icon-only': this.iconOnly,
                        'lv-box-readonly': this.readonly,
                        'lv-box-disabled': this.disabled,
                        'lv-box-padding': this.padding,
                        'lv-box-long': this.long,
                        'lv-box-invalid': this.passValid === false,
                        'lv-box-fix-width': this.width != null,
                    },
                    `lv-box-type-${this.boxType}`,
                    `lv-box-color-${this.boxColor}`,
                    `lv-box-shape-${this.boxShape}`,
                    `lv-box-size-${this.boxSize}`,
                ]
            },
            /*
             *  rules和required的结合校验规则数组
             *  @author     martsforever
             *  @datetime   2018/12/15 22:52
             */
            _rules() {
                let ret = []
                !!this.required && ret.push('required')
                !!this.rules && (ret = ret.concat(this.rules))
                return ret.length === 0 ? null : ret
            },
        },
        methods: {
            /*
             *  调用校验服务，触发校验规则
             *  @author     martsforever
             *  @datetime   2018/12/15 22:53
             */
            validate() {
                this.passValid = true
                this.passValidMsg = null
                if (!this._rules) return true;
                const result = this.$lv.$validate.validate(this.value, this._rules)
                if (!!result) {
                    this.passValid = false
                    this.passValidMsg = result.msg
                    return false
                } else {
                    this.passValid = true
                    this.passValidMsg = null
                    return true
                }
            },
            /*
             *  鼠标进入dom元素事件
             *  @author     martsforever
             *  @datetime   2018/12/15 22:53
             */
            _mouseenter() {
                this.hovering = true
                this.$emit('enter')
            },
            /*
             *  鼠标离开dom元素事件
             *  @author     martsforever
             *  @datetime   2018/12/15 22:53
             */
            _mouseleave() {
                this.hovering = false
                this.$emit('leave')
            },
        },
        created() {
            /*---------------------------------------初始化的时候校验-------------------------------------------*/
            !!this.validOnInit && !!this._rules && this.validate()
        },
        mounted() {
            /*---------------------------------------添加监听事件-------------------------------------------*/
            if (!!this.hover || !!this.clearIcon) {
                this.$el.addEventListener('mouseenter', this._mouseenter)
                this.$el.addEventListener('mouseleave', this._mouseleave)
            }
        },
        beforeDestroy() {
            /*---------------------------------------移除监听事件-------------------------------------------*/
            if (!!this.hover || !!this.clearIcon) {
                this.$el.removeEventListener('mouseenter', this._mouseenter)
                this.$el.removeEventListener('mouseleave', this._mouseleave)
            }
        },
    }
</script>

<style lang="scss">
    .lv-box {
        @include public-style;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .lv-box-clear-icon {
            cursor: pointer;
        }
        .lv-box-prefix-icon {
            margin-right: 6px;
        }
        .lv-box-suffix-icon {
            margin-left: 6px;
        }
        &.lv-box-padding {
            padding: 0 6px;
        }
        &.lv-box-long {
            min-width: unset;
            width: 100%;
        }
        &.lv-box-fix-width {
            .lv-box-content {
                flex: 1;
                display: flex;
                align-items: center;
            }
        }
        .lv-box-content {
            height: 100%;
        }

        @each $key, $value in $list-size {
            &.lv-box-size-#{$key} {
                height: $value;
                &, & span, & input, & label, & div {
                    font-size: $value/2.5;
                }
                &.lv-box-icon-only {
                    min-width: inherit;
                    width: $value !important;
                    padding: 0;
                    border-radius: $value/2;
                    .lv-box-prefix-icon, .lv-box-suffix-icon {
                        margin: 0;
                    }
                }
            }
        }

        /*fill type*/
        &.lv-box-type-fill {
            @each $key, $value in $list-color {
                &.lv-box-color-#{$key} {
                    background-color: $value;
                    border: solid $border-size $value;
                    &, & div, & input {
                        color: white;
                    }
                }
            }
        }
        /*line type*/
        &.lv-box-type-line {
            @each $key, $value in $list-color {
                &.lv-box-color-#{$key} {
                    border: solid $border-size $value;
                    background: transparent;
                    &, & div {
                        color: $value;
                    }
                    & input, .lv-box-prefix-icon, .lv-box-suffix-icon, .lv-box-clear-icon {
                        color: mix(#000, $value, 40%);
                    }
                }
            }
            &.lv-box-dashed {
                border-style: dashed;
            }
        }
        /*none type*/
        &.lv-box-type-none {
            @each $key, $value in $list-color {
                &.lv-box-color-#{$key} {
                    border: solid $border-size transparent;
                    background: transparent;
                    &, & div, & input {
                        color: mix(#000, $value, 40%);
                    }
                }
            }
        }
        /*dash type*/
        &.lv-box-type-dashed {
            @each $key, $value in $list-color {
                &.lv-box-color-#{$key} {
                    border: dotted $border-size $value;
                    background: transparent;
                    &, & div, & input {
                        color: mix(#000, $value, 40%);
                    }
                }
            }
        }

        /*shape*/
        @each $key, $value in $list-shape {
            &.lv-box-shape-#{$key} {
                border-radius: $value;
            }
        }

        &.lv-box-disabled {
            border: solid $border-size #f2f2f2 !important;
            background: #f2f2f2 !important;
            color: $color-normal-disabled !important;
            &, & * {
                cursor: not-allowed;
            }
        }

        .lv-box-tooltip {
            $tooltip-color: rgba($color-error, 1);
            visibility: visible;
            width: max-content;
            background-color: $tooltip-color;
            color: white !important;
            text-align: center;
            padding: 3px 6px;
            font-size: 12px;
            /* 定位 */
            position: absolute;
            z-index: 0;
            top: calc(100% + 3px);
            right: 0;
            &::after {
                content: " ";
                position: absolute;
                bottom: 100%;
                left: 50%;
                margin-left: -3px;
                border: 3px solid transparent;
                border-bottom-color: $tooltip-color;
            }
        }
    }
</style>