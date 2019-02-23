<template>
    <div class="pl-box" :class="classes" :style="{width:!!width&&!long&&!iconOnly?`${width}px`:null}"
         @click="e=>!readonly && !disabled && $emit('click',e)"
    >
        <pl-icon v-if="!!prefixIcon" :icon="prefixIcon" class="pl-box-prefix-icon"/>
        <pl-icon v-if="!!loading" icon="pl-loading" loading/>
        <div class="pl-box-content" v-if="!iconOnly">
            <slot></slot>
        </div>
        <pl-icon v-if="!!suffixIcon" :icon="suffixIcon" class="pl-box-suffix-icon"/>
        <pl-icon v-if="!!clearIcon && clearable" :icon="clearable&&hovering&&value!=null ?'pl-close':clearIcon" @click.stop.prevent="e=>clearable && $emit('clear',e)" class="pl-box-clear-icon"/>
        <div class="pl-box-tooltip" v-if="!!passValidMsg && passValidMsg!=='必填'">
            <span>{{passValidMsg}}</span>
        </div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-box",
        components: {PlIcon},
        props: {
            boxType: {type: String, default: 'fill',},                      //盒子类型
            boxColor: {type: String, default: 'primary'},                   //盒子颜色
            boxShape: {type: String, default: 'none'},                      //盒子形状
            boxSize: {type: String, default: 'default'},                    //盒子大小

            prefixIcon: {type: String},                                     //前置图标
            suffixIcon: {type: String},                                     //后置图标
            clearIcon: {type: String},                                      //清除图标，当该属性存在时，hover自动为true，当value有值并且hovering时，显示pl-close，否则显示clearIcon
            clearable: {type: Boolean},                                     //是否可清除
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
                        'pl-box-icon-only': this.iconOnly,
                        'pl-box-readonly': this.readonly,
                        'pl-box-disabled': this.disabled,
                        'pl-box-padding': this.padding,
                        'pl-box-long': this.long,
                        'pl-box-invalid': this.passValid === false,
                        'pl-box-fix-width': this.width != null,
                    },
                    `pl-box-type-${this.boxType}`,
                    `pl-box-color-${this.boxColor}`,
                    `pl-box-shape-${this.boxShape}`,
                    `pl-box-size-${this.boxSize}`,
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
                const result = this.$plain.$validate.validate(this.value, this._rules)
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
    .pl-box {
        @include public-style;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: fit-content;

        .pl-box-clear-icon {
            cursor: pointer;
        }
        .pl-box-prefix-icon {
            margin-right: 6px;
        }
        .pl-box-suffix-icon {
            margin-left: 6px;
        }
        &.pl-box-padding {
            padding: 0 6px;
        }
        &.pl-box-long {
            min-width: unset;
            width: 100%;
        }
        &.pl-box-fix-width {
            .pl-box-content {
                flex: 1;
                display: flex;
                align-items: center;
            }
        }
        .pl-box-content {
            height: 100%;
        }

        @each $key, $value in $list-size {
            &.pl-box-size-#{$key} {
                height: $value;
                &, & span, & input, & label, & div {
                    font-size: $value/2.5;
                }
                &.pl-box-icon-only {
                    min-width: inherit;
                    width: $value !important;
                    padding: 0;
                    border-radius: $value/2;
                    .pl-box-prefix-icon, .pl-box-suffix-icon {
                        margin: 0;
                    }
                }
            }
        }

        /*fill type*/
        &.pl-box-type-fill {
            @each $key, $value in $list-color {
                &.pl-box-color-#{$key} {
                    background-color: $value;
                    border: solid $border-size $value;
                    &, & div, & input {
                        color: white;
                    }
                }
            }
        }
        /*line type*/
        &.pl-box-type-line {
            @each $key, $value in $list-color {
                &.pl-box-color-#{$key} {
                    border: solid $border-size $value;
                    background: white;
                    &, & div {
                        color: $value;
                    }
                    & input, .pl-box-prefix-icon, .pl-box-suffix-icon, .pl-box-clear-icon {
                        color: mix(#000, $value, 40%);
                    }
                }
            }
            &.pl-box-dashed {
                border-style: dashed;
            }
        }
        /*none type*/
        &.pl-box-type-none {
            @each $key, $value in $list-color {
                &.pl-box-color-#{$key} {
                    border: solid $border-size transparent;
                    background: transparent;
                    &, & div, & input {
                        color: mix(#000, $value, 40%);
                    }
                }
            }
        }
        /*dash type*/
        &.pl-box-type-dashed {
            @each $key, $value in $list-color {
                &.pl-box-color-#{$key} {
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
            &.pl-box-shape-#{$key} {
                border-radius: $value;
            }
        }

        &.pl-box-disabled {
            border: solid $border-size #f2f2f2 !important;
            background: #f2f2f2 !important;
            color: $color-normal-disabled !important;
            &, & * {
                cursor: not-allowed;
            }
        }

        .pl-box-tooltip {
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