<template>
    <div class="lv-scroll"
         ref="host"
         :class="{'lv-scroll-hover':hover||draging}"
         :style="hostStyles"
         @mouseenter="_mouseenter"
         @mouseleave="_mouseleave"
    >
        <div class="lv-scroll-content-wrapper"
             @scroll="_handleScroll"
             :style="wrapperStyles"
             ref="wrapper">
            <div class="lv-scroll-content" ref="content" :style="contentStyles">
                <slot></slot>
            </div>
        </div>
        <div class="lv-scroll-vertical-indicator-wrapper" v-if="!hideScrollbar && !!scrollY">
            <div ref="verticalIndicator"
                 class="lv-scroll-vertical-indicator"
                 :style="verticalIndicatorStyles"
                 @mousedown="vIndicatorDragStart"></div>
        </div>
        <div class="lv-scroll-horizontal-indicator-wrapper" v-if="!hideScrollbar && !!scrollX">
            <div ref="horizontalIndicator" class="lv-scroll-horizontal-indicator"
                 :style="horizontalIndicatorStyles"
                 @mousedown="hIndicatorDragStart"></div>
        </div>
    </div>
</template>

<script>
    import {MountedMixin} from "../../mixin/component-mixin";

    const scroll = require('scroll');
    const elementResizeDetectorMaker = require('element-resize-detector');
    let erdUltraFast = elementResizeDetectorMaker({strategy: 'scroll'});

    export default {
        name: 'lv-scroll',
        mixins: [MountedMixin],
        props: {
            scrollbarSize: {type: Number, default: 9},                      //滚动条大小
            scrollbarColor: {type: String, default: 'rgba(0,0,0,0.1)'},     //滚动条颜色
            scrollX: {type: Boolean, default: false},                       //是否可横向滚动
            scrollY: {type: Boolean, default: true},                        //是否可纵向滚动
            hideScrollbar: {type: Boolean},                                 //是否显示滚动条
            fitWidth: {type: Boolean},                                      //宽度为内容宽度
            fitHeight: {type: Boolean},                                     //高度为内容高度
            fitHostWidth: {type: Boolean},                                  //宽度为宿主宽度
            fitHostHeight: {type: Boolean},                                 //高度为宿主高度
        },
        data() {
            return {
                contentWrapperScrollTop: 0,
                contentWrapperScrollLeft: 0,
                contentWidth: 0,
                contentHeight: 0,
                hostWidth: 0,
                hostHeight: 0,

                dragStartTop: 0,
                dragStartY: 0,
                dragStartLeft: 0,
                dragStartX: 0,
                hover: false,
                draging: false,
            };
        },
        mounted() {
            erdUltraFast.listenTo(this.$refs.content, this._contentResize);
            erdUltraFast.listenTo(this.$refs.host, this._hostResize);
        },
        computed: {
            indicatorHeight() {
                return (this.contentHeight > this.hostHeight + 1) ? this.hostHeight * this.hostHeight / this.contentHeight : 0;
            },
            indicatorTop() {
                return (this.hostHeight - this.indicatorHeight) * this.contentWrapperScrollTop / (this.contentHeight - this.hostHeight);
            },
            indicatorWidth() {
                return (this.contentWidth > this.hostWidth + 1) ? this.hostWidth * this.hostWidth / this.contentWidth : 0;
            },
            indicatorLeft() {
                return (this.hostWidth - this.indicatorWidth) * this.contentWrapperScrollLeft / (this.contentWidth - this.hostWidth);
            },
            verticalIndicatorStyles() {
                return {
                    height: `${this.indicatorHeight}px`,
                    width: `${this.scrollbarSize}px`,
                    top: `${this.indicatorTop}px`,
                    backgroundColor: this.scrollbarColor,
                };
            },
            horizontalIndicatorStyles() {
                return {
                    height: `${this.scrollbarSize}px`,
                    width: `${this.indicatorWidth}px`,
                    left: `${this.indicatorLeft}px`,
                    backgroundColor: this.scrollbarColor,
                };
            },
            contentStyles() {
                let styles = {};
                if (!this.scrollX && this.contentWidth > 0) styles.width = `${this.contentWidth}px`;
                if (!this.scrollY && this.contentHeight > 0) styles.height = `${this.contentHeight}px`;
                if (this.fitHostWidth != null && !!this.fitHostWidth) styles.width = `100%`;
                if (this.fitHostHeight != null && !!this.fitHostHeight) styles.height = `100%`;
                return styles;
            },
            wrapperStyles() {
                let styles = {};
                if (!this.scrollX) {
                    styles.overflowX = 'hidden';
                    styles.height = '100%';
                }
                if (!this.scrollY) {
                    styles.overflowY = 'hidden';
                    styles.width = '100%';
                }
                return styles;
            },
            hostStyles() {
                if (!this.lv_mounted) return
                const styles = {}
                if (!!this.fitWidth) styles.width = `${this.contentWidth}px`;
                if (!!this.fitHeight) styles.height = `${this.contentHeight}px`;
                return styles
            },
        },
        methods: {
            _contentResize(el) {
                this.contentWidth = el.offsetWidth;
                this.contentHeight = el.offsetHeight;
            },
            _hostResize(el) {
                this.hostWidth = el.offsetWidth;
                this.hostHeight = el.offsetHeight;
            },
            _handleScroll(e) {
                this.contentWrapperScrollTop = e.target.scrollTop;
                this.contentWrapperScrollLeft = e.target.scrollLeft;
                this.$emit('scroll', e);
                if (this.contentWrapperScrollTop === (this.contentHeight - this.hostHeight)) this.$emit('vertical-scroll-bottom');
                if (this.contentWrapperScrollTop === 0) this.$emit('vertical-scroll-top');
            },
            vIndicatorDragStart(e) {
                this.draging = true
                this.dragStartTop = this.indicatorTop;
                this.dragStartY = e.clientY;
                document.addEventListener('mousemove', this.vIndicatorDragMove);
                document.addEventListener('mouseup', this.vIndicatorDragEnd);
                this.$lv.$dom.enableSelectNone()
            },
            vIndicatorDragMove(e) {
                let deltaY = e.clientY - this.dragStartY;
                const targetTop = this.dragStartTop + deltaY;
                this.$refs.wrapper.scrollTop = `${targetTop * (this.contentHeight - this.hostHeight) / (this.hostHeight - this.indicatorHeight)}`;
            },
            vIndicatorDragEnd(e) {
                this.draging = false
                document.removeEventListener('mousemove', this.vIndicatorDragMove);
                document.removeEventListener('mouseup', this.vIndicatorDragEnd);
                this.$lv.$dom.disabledSelectNone()
            },
            hIndicatorDragStart(e) {
                this.draging = true
                this.dragStartLeft = this.indicatorLeft;
                this.dragStartX = e.clientX;
                document.addEventListener('mousemove', this.hIndicatorDragMove);
                document.addEventListener('mouseup', this.hIndicatorDragEnd);
                this.$lv.$dom.enableSelectNone()
            },
            hIndicatorDragMove(e) {
                let deltaX = e.clientX - this.dragStartX;
                const targetLeft = this.dragStartLeft + deltaX;
                this.$refs.wrapper.scrollLeft = `${targetLeft * (this.contentWidth - this.hostWidth) / (this.hostWidth - this.indicatorWidth)}`;
            },
            hIndicatorDragEnd(e) {
                this.draging = false
                document.removeEventListener('mousemove', this.hIndicatorDragMove);
                document.removeEventListener('mouseup', this.hIndicatorDragEnd);
                this.$lv.$dom.disabledSelectNone()
            },
            _mouseenter() {
                this.hover = true;
            },
            _mouseleave() {
                this.hover = false;
            },
            scrollTop(pos = 0, dur = 400, done) {
                scroll.top(this.$refs.wrapper, pos);
            },
            scrollLeft(pos = 0, dur = 400, done) {
                scroll.left(this.$refs.wrapper, pos);
            },
            scrollTo({x, y}) {
                x != null && (this.scrollLeft(x));
                y != null && (this.scrollTop(y));
            },
            setScroll({x, y}) {
                x != null && (this.$refs.wrapper.scrollLeft = x)
                y != null && (this.$refs.wrapper.scrollTop = y)
            },
            setScrollEnd({x, y}) {
                !!x && (this.$refs.wrapper.scrollLeft = this.$refs.wrapper.scrollWidth)
                !!y && (this.$refs.wrapper.scrollTop = this.$refs.wrapper.scrollHeight)
            },
        },
        beforeDestroy() {
            erdUltraFast.removeListener(this.$refs.content, this._contentResize);
            erdUltraFast.removeListener(this.$refs.host, this._hostResize);
        },
    };
</script>

<style lang="scss">
    .lv-scroll {
        display: block;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        @include public-style;

        .lv-scroll-content-wrapper {
            height: calc(100% + 17px);
            width: calc(100% + 17px);
            overflow: scroll;
            .lv-scroll-content {
                width: max-content;
                min-width: 100%;
                display: inline-block;
                float: left;
            }
        }
        .lv-scroll-vertical-indicator-wrapper {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            .lv-scroll-vertical-indicator {
                position: absolute;
                top: 0;
                right: 0;
                border-radius: 100px;
                cursor: pointer;
                opacity: 0;
                transition-duration: 0.4s;
                transition-property: opacity, height;
            }
        }
        .lv-scroll-horizontal-indicator-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .lv-scroll-horizontal-indicator {
                position: absolute;
                left: 0;
                bottom: 0;
                border-radius: 100px;
                cursor: pointer;
                opacity: 0;
                transition-duration: 0.4s;
                transition-property: opacity, width;
            }
        }
        &.lv-scroll-hover {
            & {
                & > .lv-scroll-vertical-indicator-wrapper, & > .lv-scroll-horizontal-indicator-wrapper {
                    .lv-scroll-vertical-indicator {
                        opacity: 1;
                    }
                    .lv-scroll-horizontal-indicator {
                        opacity: 1;
                    }
                }
            }
        }

        ::-webkit-scrollbar {
            background: transparent;
            width: 17px;
            height: 17px;
        }

        ::-webkit-scrollbar-thumb {
            background: transparent;
        }
    }
</style>
