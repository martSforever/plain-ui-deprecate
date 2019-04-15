<template>
    <div class="pl-popover">
        <div ref="reference"
             class="pl-popover-reference"
             @click="p_clickReference"
             @mouseenter="p_enterReference"
             @mouseleave="p_leaveReference">
            <slot></slot>
        </div>
        <div v-if="!!p_initialized"
             class="pl-popper"
             ref="popper"
             @click="p_clickPopper"
             @mouseenter="p_enterPopper"
             @mouseleave="p_leavePopper"
             v-dom-portal>
            <div class="pl-popper-position" :class="p_popperPositionClasses">
                <template v-if="!disabledDestroyOnHide && !initialized">
                    <transition :name="`pl-popover-animate-${animate}`">
                        <div v-if="!!currentValue" class="pl-popover-content" :style="p_contentStyles">
                            <slot name="popper"></slot>
                        </div>
                    </transition>
                </template>
                <template v-else>
                    <transition :name="`pl-popover-animate-${animate}`">
                        <div v-show="!!currentValue" class="pl-popover-content" :style="p_contentStyles">
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
    import {POPOVER_TRIGGER, PopoverMixin} from "./index";

    export default {
        name: "pl-popover",
        mixins: [ValueMixin, MountedMixin, PopoverMixin],
        data() {
            return {
                popper: null,
                p_initialized: this.initialized || this.value,
                p_watchValue: false,
                p_relateEL: [],
                p_timer: null,
                p_direction: this.direction,
                p_align: this.align,
            }
        },
        watch: {
            value(val) {
                if (this.currentValue === val) return
                this.show(val)
            },
            direction(val) {
                if (this.p_direction === val) return
                this.p_direction = val
                this.p_destroyed()
            },
            p_direction(val) {
                this.$emit('update:direction', val)
            },
            align(val) {
                if (this.p_align === val) return
                this.p_align = val
                this.p_destroyed()
            },
            p_align(val) {
                this.$emit('update:align', val)
            },
        },
        computed: {
            p_popperPositionClasses() {
                return [
                    {
                        'pl-popper-position-arrow': !!this.arrow,
                    },
                    `pl-popper-position-${this.p_direction}-${this.p_align}`,
                ]
            },
            p_vertical() {
                return this.$plain.$utils.oneOf(this.p_direction, ['top', 'bottom'])
            },
            p_contentStyles() {
                const ret = {}
                this.width != null && (ret.width = `${this.$plain.$utils.unit(this.width)}`)
                this.height != null && (ret.height = `${this.$plain.$utils.unit(this.height)}`)
                if (!this.disabledEqual && this.p_mounted) {
                    ret[this.p_vertical ? 'width' : 'height'] = `${this.$refs.reference[this.p_vertical ? 'offsetWidth' : 'offsetHeight']}px`
                }
                return ret
            },
        },
        mounted() {
            !!this.p_initialized && this.p_init()
        },
        methods: {
            show(val = true) {
                if (this.disabled) return
                if (!!this.p_timer) {
                    clearTimeout(this.p_timer)
                    this.p_timer = null
                }
                if (!this.p_initialized || !this.popper) {
                    this.p_initialized = true
                    this.$nextTick(() => {
                        this.currentValue = val
                        this.p_init()
                        this.$nextTick(() => {
                            this.update()
                            this.$emit('show')
                        })
                    })
                } else {
                    this.currentValue = val
                    this.$nextTick(() => {
                        this.popper.update()
                        this.$emit('show')
                    })
                }
            },
            hide() {
                this.p_timer = setTimeout(() => {
                    this.currentValue = false
                    clearTimeout(this.p_timer)
                    this.p_timer = null
                    this.$emit('hide')
                }, 100)
            },
            addRelateEl(el) {
                this.p_relateEL.push(el)
            },
            removeRelateEl(el) {
                this.p_relateEL.splice(this.p_relateEL.indexOf(el), 1)
            },
            update() {
                if (!!this.popper) {
                    this.popper.update()
                    return
                }
                if (!this.p_initialized) {
                    this.p_initialized = true
                }
                this.$nextTick(() => {
                    this.p_init()
                    this.popper.update()
                })
            },
            p_init() {
                if (!this.p_initialized) return
                if (!!this.popper) this.p_destroyed()
                window.addEventListener('click', this.p_clickWindow)
                this.addRelateEl(this.$refs.reference)
                this.addRelateEl(this.$refs.popper)
                /*这个computeStyle中的gpuAcceleration药设置为false，不设置这个的话，在定位的时候使用的是transform：translateX进行定位，使用transform定位的时候，如果xy都是基数，则会出现字体的问题*/
                this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
                    placement: `${this.p_direction}-${this.p_align}`,
                    modifiers: {
                        offset: {offset: `0,${this.offset == null ? this.arrow ? 10 : '0' : this.offset}`,},
                        preventOverflow: this.windowBoundary ? {boundariesElement: 'window'} : null,
                        computeStyle: {gpuAcceleration: false},
                    },
                    onUpdate: () => this.p_refresh(),
                    onCreate: () => this.p_refresh(),
                })
            },
            p_destroyed() {
                if (!this.popper) return
                this.popper.destroy()
                this.popper = null
                window.removeEventListener('click', this.p_clickWindow)
                this.removeRelateEl(this.$refs.reference)
                this.removeRelateEl(this.$refs.popper)
            },
            p_clickWindow(e) {
                if (!this.disabledHideOnClickOutside && !this.p_relateEL.some(el => el.contains(e.target))) this.hide()
            },
            p_clickReference(e) {
                this.$emit('clickReference', e)
                this.trigger === POPOVER_TRIGGER.CLICK && (this.disabledToggleOnClickReference ? this.show() : !!this.currentValue ? this.hide() : this.show())
            },
            p_enterReference(e) {
                this.$emit('enterReference', e)
                this.trigger === POPOVER_TRIGGER.HOVER && (this.show())
            },
            p_leaveReference(e) {
                this.$emit('leaveReference', e)
                this.trigger === POPOVER_TRIGGER.HOVER && (this.hide())
            },
            p_clickPopper() {
                this.$emit('clickPopper')
            },
            p_enterPopper(e) {
                this.$emit('enterReference', e)
                this.trigger === POPOVER_TRIGGER.HOVER && (this.show())
            },
            p_leavePopper(e) {
                this.$emit('leaveReference', e)
                this.trigger === POPOVER_TRIGGER.HOVER && (this.hide())
            },
            p_refresh() {
                let placement = this.popper.popper.getAttribute('x-placement').split('-');
                this.p_direction = placement[0];
                this.p_align = placement[1];
            },
        },
        beforeDestroy() {
            this.p_destroyed()
            !!this.$refs.popper && document.body.removeChild(this.$refs.popper)
        },
    }
</script>