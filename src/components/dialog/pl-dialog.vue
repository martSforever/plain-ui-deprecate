<template>
    <transition :name="transition">
        <div class="pl-dialog"
             :class="classes"
             v-show="currentValue"
             v-dom-portal="transferDom"
             :style="styles"
             @click="p_clickShadow"
             @mouseenter="pl_mouseenter"
             @mouseleave="pl_mouseleave">
            <div class="pl-dialog-content"
                 ref="content"
                 v-if="p_initialized"
                 @click.stop="p_clickContent"
                 :style="contentStyles">
                <div class="pl-dialog-head" v-if="!noHeader">
                    <div class="pl-dialog-title">
                        <pl-icon :icon="TYPE[type]" v-if="!!type" class="pl-dialog-type-icon"/>
                        <span>{{title}}</span>
                    </div>
                    <div class="pl-dialog-head-operator">
                        <!--<pl-icon icon="pl-minimize"/>-->
                        <pl-icon icon="pl-maximize" v-show="!p_isFull && !!max" @click="p_isFull=true"/>
                        <pl-icon icon="pl-maxmin" v-show="!!p_isFull && !!max" @click="p_isFull=false"/>
                        <pl-icon icon="pad-close" @click="hide" class="pl-dialog-close-icon" v-if="!noClose" hover/>
                    </div>
                </div>
                <div class="pl-dialog-body" :style="bodyStyles">
                    <slot></slot>
                </div>
                <div class="pl-dialog-foot" :class="[`pl-dialog-foot-align-${footAlign}`]" v-if="!noFooter && (cancelButton || confirmButton || !!$slots.foot)">
                    <slot name="foot">
                        <pl-button box-type="line" label="取消" @click="p_cancel" v-if="!!cancelButton"/>
                        <pl-button label="确认" @click="p_confirm" v-if="!!confirmButton"/>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";
    import PlIcon from "../icon/pl-icon";
    import PlButton from "../button/pl-button";
    import {TYPE} from "../../index";
    import keyboard from 'src/utils/keyboard'

    export default {
        name: "pl-dialog",
        components: {PlButton, PlIcon},
        mixins: [ValueMixin],
        props: {
            type: {type: String, default: 'info'},                                              //标题类型 info|success|warn|error|help
            title: {type: String, default: '提示'},                                             //标题
            shape: {type: String, default: 'none'},                                             //形状 none|fillet
            shadowColor: {type: String, default: 'rgba(0,0,0,0.25)'},                           //遮罩层演策
            disabledHideOnClickShadow: {type: Boolean,},                                        //是否禁用点击遮罩关闭窗口功能
            transition: {type: String, default: 'pl-dialog-animate-drop'},                      //对话框显隐动画
            height: {type: String | Number,},                                                   //对话框内容高度
            minHeight: {type: String | Number},                                                 //对话框内容最小高度
            maxHeight: {type: String | Number},                                                 //对话框内容最大高度
            width: {type: String | Number,},                                                    //对话框内容宽度
            minWidth: {type: String | Number},                                                  //对话框内容最小宽度
            maxWidth: {type: String | Number},                                                  //对话框内容最大宽度
            full: {type: Boolean},                                                              //对话框是否沾满全屏
            confirmButton: {type: Boolean},                                                     //是否带确认按钮
            cancelButton: {type: Boolean},                                                      //是否带取消按钮
            noClose: {type: Boolean},                                                           //是否隐藏关闭按钮
            dialogClass: {type: String,},                                                       //由于对话框有可能被移动到body节点下，这里设置对话框class，以便控制样式
            vertical: {type: String},                                                           //对话框纵向位置 start|center|end
            horizontal: {type: String},                                                         //对话框横向位置 start|center|end
            initialized: {type: Boolean,},                                                      //对话框是否初始化的时候就初始化内容，默认为否
            destroyOnHide: {type: Boolean},                                                     //对话框是否在关闭的时候销毁内容
            transferDom: {type: Boolean},                                                       //对话框是否移动到body节点下
            max: {type: Boolean},                                                               //是否可最大化
            noHeader: {type: Boolean},                                                          //不带顶部栏
            noFooter: {type: Boolean},                                                          //不带底部栏
            noPadding: {type: Boolean},                                                         //对话框内容去掉默认内边距
            // min: {type: Boolean},
            // remove: {type: Boolean},
            top: {type: Number | String,},                                                      //对话框偏移顶部位置
            bottom: {type: Number | String},                                                    //对话框偏移底部位置
            left: {type: Number | String},                                                      //对话框偏移左边界位置
            right: {type: Number | String},                                                     //对话框偏移右边界位置
            footAlign: {type: String, default: 'center'},                                       //对话框底部对其方式left|center|right

            enterToConfirm: {type: Boolean, default: true},                                     //是否回车触发confirm事件
            spaceToConfirm: {type: Boolean, default: true},                                     //是否空格触发confirm事件
            escToCancel: {type: Boolean, default: true},                                        //是否Esc触发cancel事件

            disabledHideOnConfirm: {type: Boolean},                                             //禁用触发确认事件之后的关闭弹框动作
            disabledHideOnCancel: {type: Boolean},                                              //禁用触发取消事件之后的关闭弹框动作
        },
        data() {
            return {
                TYPE: Object.keys(TYPE).reduce((ret, key) => {
                    ret[key] = TYPE[key].icon
                    return ret
                }, {}),
                p_index: 0,
                p_watchValue: false,
                p_isFull: this.full,
                p_initialized: this.initialized || this.value,

                keyboardListener: {
                    'enter': () => {
                        !!this.enterToConfirm && this.p_confirm()
                    },
                    'space': () => {
                        !!this.spaceToConfirm && this.p_confirm()
                    },
                    'esc': () => {
                        !!this.escToCancel && this.p_cancel()
                    },
                }
            }
        },
        watch: {
            value(val) {
                if (val !== this.currentValue) this.show(val)
            },
        },
        computed: {
            classes() {
                return [
                    {
                        'pl-dialog-full-size': this.full || this.p_isFull,
                        'pl-dialog-padding': !this.noPadding,
                    },
                    `pl-dialog-type-${this.type}`,
                    `pl-dialog-shape-${this.shape}`,
                    `pl-dialog-vertical-${this.vertical || 'start'}`,
                    `pl-dialog-horizontal-${this.horizontal || 'center'}`,
                    this.dialogClass,
                ]
            },
            styles() {
                return {
                    backgroundColor: this.shadowColor,
                    zIndex: this.p_index,
                }
            },
            bodyStyles() {
                const styles = {};
                ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'].forEach(prop => !!this[prop] && (styles[prop] = this.$plain.$utils.unit(this[prop])))
                if (!this.width && !this.minWidth && !this.maxWidth) {
                    styles.minWidth = '336px'
                    styles.maxWidth = '500px'
                }
                if (!this.height && !this.minHeight) styles.minHeight = '88px'
                return styles
            },
            contentStyles() {
                const styles = {}
                styles.top = `${this.top != null ? this.top : !this.vertical && !this.horizontal ? '10vh' : 0}`
                this.left != null && (styles.left = this.$plain.$utils.unit(this.left))
                this.bottom != null && (styles.bottom = this.$plain.$utils.unit(this.bottom))
                this.right != null && (styles.right = this.$plain.$utils.unit(this.right))
                return styles
            },
        },
        methods: {
            show(val = true) {
                const next = () => {
                    this.p_index = this.p_getTopIndex()
                    this.currentValue = val
                }
                if (!this.p_initialized) {
                    this.p_initialized = true
                    this.$nextTick(() => next())
                }
                else next()

            },
            hide() {
                this.currentValue = false
                !!this.destroyOnHide && setTimeout(() => this.p_initialized = false, this.$plain.transitionTime)
                setTimeout(() => this.$plain.zIndex -= 3, this.$plain.transitionTime)
            },
            p_clickShadow(e) {
                if (!this.$refs.content.contains(e.target)) {
                    this.$emit('clickShadow', e)
                    if (!this.disabledHideOnClickShadow) {
                        this.p_cancel()
                    }
                }
            },
            p_clickContent(e) {
                this.$emit('clickContent', e)
            },
            p_getTopIndex() {
                this.$plain.zIndex += 3
                return this.$plain.zIndex
            },
            p_confirm() {
                this.$emit('confirm')
                !this.disabledHideOnConfirm && this.hide()
            },
            p_cancel() {
                this.$emit('cancel')
                !this.disabledHideOnCancel && this.hide()
            },
            pl_mouseenter() {
                keyboard.addListener(this.keyboardListener)
            },
            pl_mouseleave() {
                keyboard.removeListener(this.keyboardListener)
            },
        },
        beforeDestroy() {
            keyboard.removeListener(this.keyboardListener)
            !!this.$el && document.body.removeChild(this.$el)
        },
    }
</script>

<style lang="scss">
    $head-height: 40px;
    $dialog-types: (
            info:$color-primary,
            warn:$color-warn,
            error:$color-error,
            success:$color-success,
            help:$color-info,
    );
    .pl-dialog {
        @include public-style;
        @include transition-all;
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 0;

        .pl-dialog-content {
            position: relative;
            background-color: white;
            box-shadow: $box-shadow;
            @include transition-all;
            .pl-dialog-head, .pl-dialog-foot {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 $padding;
            }
            .pl-dialog-head {
                border-bottom: solid $border-size $color-normal-border;
                height: $head-height;
                font-weight: bold;
                box-sizing: border-box;
                .pl-dialog-type-icon {
                    margin-right: $padding/2;
                }
                .pl-dialog-head-operator {
                    .pl-icon {
                        @include transition-all;
                        cursor: pointer;
                        &:hover {
                            transform: scale(1.3);
                        }
                        &:not(:first-child) {
                            margin-left: 12px;
                        }
                    }
                }
            }
            .pl-dialog-body {
                box-sizing: border-box;
                overflow: auto;
            }
            .pl-dialog-foot {
                justify-content: flex-end;
                box-sizing: border-box;
                padding-bottom: $padding/4*3;
                .pl-button {
                    margin-left: $padding/4*3;
                }
                &.pl-dialog-foot-align-left {
                    justify-content: flex-start;
                }
                &.pl-dialog-foot-align-center {
                    justify-content: center;
                }
                &.pl-dialog-foot-align-right {
                    justify-content: flex-end;
                }
            }
        }

        &.pl-dialog-animate-drop-enter-active, &.pl-dialog-animate-drop-leave-active {
            opacity: 1;
            .pl-dialog-content {
                transform: translateY(0);
            }
        }
        &.pl-dialog-animate-drop-enter, &.pl-dialog-animate-drop-leave-to {
            opacity: 0;
            .pl-dialog-content {
                transform: translateY(5vh);
            }
        }

        &.pl-dialog-scale-enter-active, &.pl-dialog-scale-leave-active {
            .pl-dialog-content {
                transform: scale(1);
            }
        }

        &.pl-dialog-scale-enter, &.pl-dialog-scale-leave-to {
            .pl-dialog-content {
                transform: scale(1.1);
                opacity: 0;
            }
        }

        @each $key, $value in $dialog-types {
            &.pl-dialog-type-#{$key} {
                .pl-dialog-title {
                    color: $value;
                }
            }
        }
        @each $key, $value in $list-shape {
            &.pl-dialog-shape-#{$key} {
                .pl-dialog-content {
                    border-radius: $value;
                }
            }
        }

        &.pl-dialog-full-size {
            .pl-dialog-content {
                width: 100% !important;
                height: 100% !important;
                top: 0 !important;
                left: 0 !important;
                bottom: inherit !important;
                right: inherit !important;
            }
        }
        &.pl-dialog-padding {
            .pl-dialog-body {
                padding: $padding;
                box-sizing: $padding;
            }
        }

        &.pl-dialog-horizontal-start {
            justify-content: flex-start;
        }
        &.pl-dialog-horizontal-center {
            justify-content: center;
        }
        &.pl-dialog-horizontal-end {
            justify-content: flex-end;
        }

        &.pl-dialog-vertical-start {
            align-items: flex-start;
        }
        &.pl-dialog-vertical-center {
            align-items: center;
        }
        &.pl-dialog-vertical-end {
            align-items: flex-end;
        }
    }

    .pl-dialog-service {
        .pl-dialog-service-center {
            height: 100%;
            width: 100%;
            text-align: center;
            .pl-textarea {
                height: 100%;
                width: 100%;
            }
        }
    }
</style>