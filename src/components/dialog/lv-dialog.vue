<template>
    <transition :name="transition">
        <div class="lv-dialog"
             :class="classes"
             v-show="currentValue"
             v-dom-portal="transferDom"
             :style="styles"
             @click="p_clickShadow">
            <div class="lv-dialog-content"
                 v-if="p_initialized"
                 @click.stop="p_clickContent"
                 :style="contentStyles">
                <div class="lv-dialog-head" v-if="!noHeader">
                    <div class="lv-dialog-title">
                        <lv-icon :icon="TYPE[type]" v-if="!!type" class="lv-dialog-type-icon"/>
                        <span>{{title}}</span>
                    </div>
                    <div class="lv-dialog-head-operator">
                        <lv-icon icon="lv-minimize"/>
                        <lv-icon icon="lv-maximize" v-show="!p_isFull && !!max" @click="p_isFull=true"/>
                        <lv-icon icon="lv-maxmin" v-show="!!p_isFull && !!max" @click="p_isFull=false"/>
                        <lv-icon icon="lv-close" @click="hide" class="lv-dialog-close-icon" v-if="!noClose"/>
                    </div>
                </div>
                <div class="lv-dialog-body" :style="bodyStyles">
                    <slot></slot>
                </div>
                <div class="lv-dialog-foot" v-if="!noFooter && (cancelButton || confirmButton)">
                    <lv-button box-type="line" label="取消" @click="p_cancel" v-if="!!confirmButton"/>
                    <lv-button label="确认" @click="p_confirm" v-if="!!cancelButton"/>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";
    import LvIcon from "../icon/lv-icon";
    import LvButton from "../button/lv-button";
    import {TYPE} from "../../index";

    export default {
        name: "lv-dialog",
        components: {LvButton, LvIcon},
        mixins: [ValueMixin],
        props: {
            type: {type: String, default: 'info'},                                              //标题类型 info|success|warn|error|help
            title: {type: String, default: '提示'},                                              //标题
            shape: {type: String, default: 'none'},                                             //形状 none|fillet
            shadowColor: {type: String, default: 'rgba(0,0,0,0.25)'},                           //遮罩层演策
            disabledHideOnClickShadow: {type: Boolean,},                                        //是否禁用点击遮罩关闭窗口功能
            transition: {type: String, default: 'lv-dialog-animate-drop'},                      //对话框显隐动画
            height: {type: String | Number, default: 88},                                       //对话框高度
            width: {type: String | Number, default: 336},                                       //对话框宽度
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
                p_initialized: this.initialized || this.value
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
                        'lv-dialog-full-size': this.full || this.p_isFull,
                        'lv-dialog-padding': !this.noPadding,
                    },
                    `lv-dialog-type-${this.type}`,
                    `lv-dialog-shape-${this.shape}`,
                    `lv-dialog-vertical-${this.vertical || 'center'}`,
                    `lv-dialog-horizontal-${this.horizontal || 'center'}`,
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
                return {
                    minWidth: this.$plain.$utils.unit(this.width),
                    minHeight: this.$plain.$utils.unit(this.height),
                }
            },
            contentStyles() {
                const styles = {}
                styles.top = `${this.top != null ? this.top : !this.vertical && !this.horizontal ? -200 : 0}px`
                this.left != null && (styles.left = this.$plain.$utils.unit(this.left))
                this.bottom != null && (styles.bottom = this.$plain.$utils.unit(this.bottom))
                this.right != null && (styles.right = this.$plain.$utils.unit(this.right))
                return styles
            },
        },
        mounted() {
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
                !!this.destroyOnHide && this.$nextTick(() => this.p_initialized = false)
            },
            p_clickShadow(e) {
                this.$emit('clickShadow', e)
                !this.disabledHideOnClickShadow && this.hide()
            },
            p_clickContent(e) {
                this.$emit('clickContent', e)
            },
            p_getTopIndex() {
                return this.$plain.$utils.dateFormat(new Date(), 'mmssSSS') - 0
            },
            p_confirm() {
                this.$emit('confirm')
            },
            p_cancel() {
                this.$emit('cancel')
            },
        }
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
    .lv-dialog {
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

        .lv-dialog-content {
            position: relative;
            background-color: white;
            box-shadow: $box-shadow;
            @include transition-all;
            .lv-dialog-head, .lv-dialog-foot {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 $padding;
            }
            .lv-dialog-head {
                border-bottom: solid $border-size $color-normal-border;
                height: $head-height;
                font-weight: bold;
                box-sizing: border-box;
                .lv-dialog-type-icon {
                    margin-right: $padding/2;
                }
                .lv-dialog-head-operator {
                    .lv-icon {
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
            .lv-dialog-body {
                box-sizing: border-box;
            }
            .lv-dialog-foot {
                justify-content: flex-end;
                box-sizing: border-box;
                padding-bottom: $padding/4*3;
                .lv-button {
                    margin-left: $padding/4*3;
                }
            }
        }

        &.lv-dialog-animate-drop-enter-active, &.lv-dialog-animate-drop-leave-active {
            opacity: 1;
            .lv-dialog-content {
                transform: translateY(0);
            }
        }
        &.lv-dialog-animate-drop-enter, &.lv-dialog-animate-drop-leave-to {
            opacity: 0;
            .lv-dialog-content {
                transform: translateY(5vh);
            }
        }

        &.lv-dialog-scale-enter-active, &.lv-dialog-scale-leave-active {
            .lv-dialog-content {
                transform: scale(1);
            }
        }

        &.lv-dialog-scale-enter, &.lv-dialog-scale-leave-to {
            .lv-dialog-content {
                transform: scale(1.1);
                opacity: 0;
            }
        }

        @each $key, $value in $dialog-types {
            &.lv-dialog-type-#{$key} {
                .lv-dialog-title {
                    color: $value;
                }
            }
        }
        @each $key, $value in $list-shape {
            &.lv-dialog-shape-#{$key} {
                .lv-dialog-content {
                    border-radius: $value;
                }
            }
        }

        &.lv-dialog-full-size {
            .lv-dialog-content {
                width: 100% !important;
                height: 100% !important;
                top: 0 !important;
                left: 0 !important;
                bottom: inherit !important;
                right: inherit !important;
            }
        }
        &.lv-dialog-padding {
            .lv-dialog-body {
                padding: $padding;
                box-sizing: $padding;
            }
        }

        &.lv-dialog-horizontal-start {
            justify-content: flex-start;
        }
        &.lv-dialog-horizontal-center {
            justify-content: center;
        }
        &.lv-dialog-horizontal-end {
            justify-content: flex-end;
        }

        &.lv-dialog-vertical-start {
            align-items: flex-start;
        }
        &.lv-dialog-vertical-center {
            align-items: center;
        }
        &.lv-dialog-vertical-end {
            align-items: flex-end;
        }
    }
</style>