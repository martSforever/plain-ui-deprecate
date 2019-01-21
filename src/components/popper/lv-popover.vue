<template>
    <div class="lv-popover">
        <div ref="reference"
             class="lv-popover-reference"
             @click="lv_clickReference"
             @mouseenter="lv_enterReference"
             @mouseleave="lv_leaveReference">
            <slot></slot>
        </div>
        <div v-if="!!lv_initialized"
             class="lv-popper"
             ref="popper"
             @click="lv_clickPopper"
             @mouseenter="lv_enterPopper"
             @mouseleave="lv_leavePopper"
             v-dom-portal>
            <div class="lv-popper-position" :class="lv_popperPositionClasses">
                <template v-if="!disabledDestroyOnHide && !initialized">
                    <transition :name="`lv-popover-animate-${animate}`">
                        <div v-if="!!currentValue" class="lv-popover-content" :style="lv_contentStyles">
                            <slot name="popper"></slot>
                        </div>
                    </transition>
                </template>
                <template v-else>
                    <transition :name="`lv-popover-animate-${animate}`">
                        <div v-show="!!currentValue" class="lv-popover-content" :style="lv_contentStyles">
                            <slot name="popper"></slot>
                        </div>
                    </transition>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
    import {MountedMixin, ValueMixin} from "../../mixin/component-mixin";
    import Popper from 'popper.js'

    const TRIGGER = {
        CLICK: 'click',
        HOVER: 'hover',
    }
    const DIRECTION = {
        TOP: 'top',
        BOTTOM: 'bottom',
        LEFT: 'left',
        RIGHT: 'right',
    }
    const ALIGN = {
        START: 'start',
        CENTER: 'center',
        END: 'end',
    }

    export default {
        name: "lv-popover",
        mixins: [ValueMixin, MountedMixin],
        props: {
            trigger: {type: String, default: TRIGGER.CLICK},                        //触发的动作：hover|click
            disabledHideOnClickOutside: {type: Boolean},                            //禁用点击外部的时候关闭弹出框
            disabledDestroyOnHide: {type: Boolean},                                 //禁用隐藏的时候销毁内容
            initialized: {type: Boolean},                                           //是否在初始化的时候就初始化内容
            direction: {type: String, default: DIRECTION.BOTTOM},                   //弹出框的方向：top|bottom|left|right
            align: {type: String, default: ALIGN.START},                            //弹出框的对其方式
            animate: {type: String, default: 'drop'},                               //弹出框显隐动画
            arrow: {type: Boolean},                                                 //弹出框是否带小三角
            offset: {type: Number},                                                 //弹出框与载体的距离
            height: {default: 180},                                                 //弹出框的高度
            width: {default: 180},                                                  //弹出框的宽度
            disabledEqual: {type: Boolean},                                         //弹出框是否与载体在方向上大小相同
            windowBoundary: {type: Boolean, default: true},                         //边界为window
        },
        data() {
            return {
                popper: null,
                lv_initialized: this.initialized || this.value,
                lv_watchValue: false,
                lv_relateEL: [],
                lv_timer: null,
                lv_direction: this.direction,
                lv_align: this.align,
            }
        },
        watch: {
            value(val) {
                if (this.currentValue === val) return
                this.show(val)
            },
            direction(val) {
                if (this.lv_direction === val) return
                this.lv_direction = val
                this.lv_destroyed()
            },
            lv_direction(val) {
                this.$emit('update:direction', val)
            },
            align(val) {
                if (this.lv_align === val) return
                this.lv_align = val
                this.lv_destroyed()
            },
            lv_align(val) {
                this.$emit('update:align', val)
            },
        },
        computed: {
            lv_popperPositionClasses() {
                return [
                    {
                        'lv-popper-position-arrow': !!this.arrow,
                    },
                    `lv-popper-position-${this.lv_direction}-${this.lv_align}`,
                ]
            },
            lv_vertical() {
                return this.$lv.$utils.oneOf(this.lv_direction, ['top', 'bottom'])
            },
            lv_contentStyles() {
                const ret = {}
                this.width != null && (ret.width = `${this.$lv.$utils.unit(this.width)}`)
                this.height != null && (ret.height = `${this.$lv.$utils.unit(this.height)}`)
                if (!this.disabledEqual && this.lv_mounted) {
                    ret[this.lv_vertical ? 'width' : 'height'] = `${this.$refs.reference[this.lv_vertical ? 'offsetWidth' : 'offsetHeight']}px`
                }
                return ret
            },
        },
        mounted() {
            !!this.lv_initialized && this.lv_init()
        },
        methods: {
            show(val = true) {
                if (!!this.lv_timer) {
                    clearTimeout(this.lv_timer)
                    this.lv_timer = null
                }
                if (!this.lv_initialized || !this.popper) {
                    this.lv_initialized = true
                    this.$nextTick(() => {
                        this.currentValue = val
                        this.lv_init()
                    })
                } else {
                    this.currentValue = val
                    this.$nextTick(() => this.popper.update())
                }
            },
            hide() {
                this.lv_timer = setTimeout(() => {
                    this.currentValue = false
                    clearTimeout(this.lv_timer)
                    this.lv_timer = null
                }, 100)
            },
            addRelateEl(el) {
                this.lv_relateEL.push(el)
            },
            removeRelateEl(el) {
                this.lv_relateEL.splice(this.lv_relateEL.indexOf(el), 1)
            },
            update() {
                if (!!this.popper) {
                    this.popper.update()
                    return
                }
                if (!this.lv_initialized) {
                    this.lv_initialized = true
                }
                this.$nextTick(() => {
                    this.lv_init()
                    this.popper.update()
                })
            },
            lv_init() {
                if (!this.lv_initialized) return
                if (!!this.popper) this.lv_destroyed()
                window.addEventListener('click', this.lv_clickWindow)
                this.addRelateEl(this.$refs.reference)
                this.addRelateEl(this.$refs.popper)
                this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
                    placement: `${this.lv_direction}-${this.lv_align}`,
                    modifiers: {
                        offset: {offset: `0,${this.offset == null ? this.arrow ? 10 : '0' : this.offset}`,},
                        preventOverflow: this.windowBoundary ? {boundariesElement: 'window'} : null
                    },
                    onUpdate: () => this.lv_refresh(),
                    onCreate: () => this.lv_refresh(),
                })
            },
            lv_destroyed() {
                if (!this.popper) return
                this.popper.destroy()
                this.popper = null
                window.removeEventListener('click', this.lv_clickWindow)
                this.removeRelateEl(this.$refs.reference)
                this.removeRelateEl(this.$refs.popper)
            },
            lv_clickWindow(e) {
                if (!this.disabledHideOnClickOutside && !this.lv_relateEL.some(el => el.contains(e.target))) this.hide()
            },
            lv_clickReference(e) {
                this.$emit('clickReference', e)
                this.trigger === TRIGGER.CLICK && (this.show())
            },
            lv_enterReference(e) {
                this.$emit('enterReference', e)
                this.trigger === TRIGGER.HOVER && (this.show())
            },
            lv_leaveReference(e) {
                this.$emit('leaveReference', e)
                this.trigger === TRIGGER.HOVER && (this.hide())
            },
            lv_clickPopper() {
                this.$emit('clickPopper')
            },
            lv_enterPopper(e) {
                this.$emit('enterReference', e)
                this.trigger === TRIGGER.HOVER && (this.show())
            },
            lv_leavePopper(e) {
                this.$emit('leaveReference', e)
                this.trigger === TRIGGER.HOVER && (this.hide())
            },
            lv_refresh() {
                let placement = this.popper.popper.getAttribute('x-placement').split('-');
                this.lv_direction = placement[0];
                this.lv_align = placement[1];
            },
        },
        beforeDestroy() {
            this.lv_destroyed()
            !!this.$refs.popper && document.body.removeChild(this.$refs.popper)
        },
    }
</script>

<style lang="scss">
    .lv-popover {
        @include public-style;
        display: inline-block;
        .lv-popover-reference {
            display: inline-block;
        }
    }

    $popper-arrow-size: 6px;
    $popper-back-ground: white;
    .lv-popper {
        .lv-popper-position {
            .lv-popover-content {
                background-color: $popper-back-ground;
                @include transition-all;
            }

            $popper-scale-animates: (
                    top-start:(
                            transform-origin:bottom left,
                            active-transform:scaleY(1),
                            inactive-transform:scaleY(0),
                            arrow-top:inherit,
                            arrow-bottom:-$popper-arrow-size*2,
                            arrow-left:$popper-arrow-size,
                            arrow-right:inherit,
                            arrow-border-color:$popper-back-ground transparent transparent transparent,
                            box-shadow-x:0,
                            box-shadow-y:-2px,
                    ),
                    top-center:(
                            transform-origin:bottom center,
                            active-transform:scaleY(1),
                            inactive-transform:scaleY(0),
                            arrow-top:inherit,
                            arrow-bottom:-$popper-arrow-size*2,
                            arrow-left:calc(50% - #{$popper-arrow-size}),
                            arrow-right:inherit,
                            arrow-border-color:$popper-back-ground transparent transparent transparent,
                            box-shadow-x:0,
                            box-shadow-y:-2px,
                    ),
                    top-end:(
                            transform-origin:bottom right,
                            active-transform:scaleY(1),
                            inactive-transform:scaleY(0),
                            arrow-top:inherit,
                            arrow-bottom:-$popper-arrow-size*2,
                            arrow-left:inherit,
                            arrow-right:$popper-arrow-size,
                            arrow-border-color:$popper-back-ground transparent transparent transparent,
                            box-shadow-x:0,
                            box-shadow-y:-2px,
                    ),
                    bottom-start:(
                            transform-origin:top left,
                            active-transform:scaleY(1),
                            inactive-transform:scaleY(0),
                            arrow-top:-$popper-arrow-size*2,
                            arrow-bottom:inherit,
                            arrow-left:$popper-arrow-size,
                            arrow-right:inherit,
                            arrow-border-color:transparent transparent $popper-back-ground transparent,
                            box-shadow-x:0,
                            box-shadow-y:2px,
                    ),
                    bottom-center:(
                            transform-origin:top center,
                            active-transform:scaleY(1),
                            inactive-transform:scaleY(0),
                            arrow-top:-$popper-arrow-size*2,
                            arrow-bottom:inherit,
                            arrow-left:calc(50% - #{$popper-arrow-size}),
                            arrow-right:inherit,
                            arrow-border-color:transparent transparent $popper-back-ground transparent,
                            box-shadow-x:0,
                            box-shadow-y:2px,
                    ),
                    bottom-end:(
                            transform-origin:top right,
                            active-transform:scaleY(1),
                            inactive-transform:scaleY(0),
                            arrow-top:-$popper-arrow-size*2,
                            arrow-bottom:inherit,
                            arrow-left:inherit,
                            arrow-right:$popper-arrow-size,
                            arrow-border-color:transparent transparent $popper-back-ground transparent,
                            box-shadow-x:0,
                            box-shadow-y:2px,
                    ),
                    left-start:(
                            transform-origin:right top,
                            active-transform:scaleX(1),
                            inactive-transform:scaleX(0),
                            arrow-top:$popper-arrow-size,
                            arrow-bottom:inherit,
                            arrow-left:inherit,
                            arrow-right:-$popper-arrow-size*2,
                            arrow-border-color:transparent transparent transparent $popper-back-ground,
                            box-shadow-x:-2px,
                            box-shadow-y:0,
                    ),
                    left-center:(
                            transform-origin:right center,
                            active-transform:scaleX(1),
                            inactive-transform:scaleX(0),
                            arrow-top:calc(50% - #{$popper-arrow-size}),
                            arrow-bottom:inherit,
                            arrow-left:inherit,
                            arrow-right:-$popper-arrow-size*2,
                            arrow-border-color:transparent transparent transparent $popper-back-ground,
                            box-shadow-x:-2px,
                            box-shadow-y:0,
                    ),
                    left-end:(
                            transform-origin:right bottom,
                            active-transform:scaleX(1),
                            inactive-transform:scaleX(0),
                            arrow-top:inherit,
                            arrow-bottom:$popper-arrow-size,
                            arrow-left:inherit,
                            arrow-right:-$popper-arrow-size*2,
                            arrow-border-color:transparent transparent transparent $popper-back-ground,
                            box-shadow-x:-2px,
                            box-shadow-y:0,
                    ),
                    right-start:(
                            transform-origin:left top,
                            active-transform:scaleX(1),
                            inactive-transform:scaleX(0),
                            arrow-top:$popper-arrow-size,
                            arrow-bottom:inherit,
                            arrow-left:-$popper-arrow-size*2,
                            arrow-right:inherit,
                            arrow-border-color:transparent $popper-back-ground transparent transparent,
                            box-shadow-x:2px,
                            box-shadow-y:0,
                    ),
                    right-center:(
                            transform-origin:left center,
                            active-transform:scaleX(1),
                            inactive-transform:scaleX(0),
                            arrow-top:calc(50% - #{$popper-arrow-size}),
                            arrow-bottom:inherit,
                            arrow-left:-$popper-arrow-size*2,
                            arrow-right:inherit,
                            arrow-border-color:transparent $popper-back-ground transparent transparent,
                            box-shadow-x:2px,
                            box-shadow-y:0,
                    ),
                    right-end:(
                            transform-origin:left bottom,
                            active-transform:scaleX(1),
                            inactive-transform:scaleX(0),
                            arrow-top:inherit,
                            arrow-bottom:$popper-arrow-size,
                            arrow-left:-$popper-arrow-size*2,
                            arrow-right:inherit,
                            arrow-border-color:transparent $popper-back-ground transparent transparent,
                            box-shadow-x:2px,
                            box-shadow-y:0,
                    ),
            );

            @each $key, $type in $popper-scale-animates {
                $type-object: map_get($popper-scale-animates, $key);
                &.lv-popper-position-#{$key} {
                    .lv-popover-content {
                        box-shadow: map_get($type-object, box-shadow-x) map_get($type-object, box-shadow-y) 12px 0 rgba(0, 0, 0, .1);
                        transform-origin: map_get($type-object, transform-origin);
                        &.lv-popover-animate-drop-enter-active, &.lv-popover-animate-drop-leave-active {
                            transform: map_get($type-object, active-transform);
                            opacity: 1;
                        }
                        &.lv-popover-animate-drop-enter, &.lv-popover-animate-drop-leave-to {
                            transform: map_get($type-object, inactive-transform);
                            opacity: 0;
                        }
                        &.lv-popover-animate-scale-enter-active, &.lv-popover-animate-scale-leave-active {
                            transform: scale(1);
                            opacity: 1;
                        }
                        &.lv-popover-animate-scale-enter, &.lv-popover-animate-scale-leave-to {
                            transform: scale(0.6);
                            opacity: 0;
                        }
                    }
                    &.lv-popper-position-arrow {
                        .lv-popover-content {
                            &::after {
                                content: " ";
                                position: absolute;
                                border: $popper-arrow-size solid;

                                top: map_get($type-object, arrow-top);
                                bottom: map_get($type-object, arrow-bottom);
                                left: map_get($type-object, arrow-left);
                                right: map_get($type-object, arrow-right);
                                border-color: map_get($type-object, arrow-border-color);
                            }
                        }
                    }
                }
            }
        }
    }
</style>