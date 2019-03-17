<template>
    <transition name="pl-transition-fade">
        <div class="pl-markdown-parser-item-closer"
             :style="styles"
             :class="{'pl-markdown-parser-item-closer-fixed':isFixed,'pl-markdown-parser-item-closer-open':open}">
            <div class="pl-markdown-parser-item-closer-content">
                <div class="pl-markdown-parser-item-closer-left">
                    <slot name="left"></slot>
                </div>
                <div class="pl-markdown-parser-item-closer-inner" @click="e=>$emit('click',e)">
                    <span>显示全部</span>
                    <pl-icon :icon="!open?'pl-double-arrow-down':'pl-double-arrow-up'"/>
                </div>
                <div class="pl-markdown-parser-item-closer-right">
                    <slot name="right"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-markdown-parser-item-closer",
        components: {PlIcon},
        props: {
            open: {type: Boolean, default: false},                          //当前是否处于打开状态
            leftWidth: {},                                                  //示例左侧内容宽度

            clientWidth: {},                                                //示例组件的宽度
            clientLeft: {},                                                 //示例组件在网页距离左侧的距离
            isFixed: {type: Boolean, default: false},                       //当前是否为固定底部的关闭器
        },
        computed: {
            styles() {
                const styles = {}
                !!this.position && (styles.position = this.position)
                if (this.isFixed) {
                    !!this.clientWidth && (styles.width = `${this.clientWidth}px`)
                    !!this.clientLeft && (styles.left = `${this.clientLeft}px`)
                }
                return styles
            },
        },
    }
</script>

<style lang="scss">
    .pl-markdown-parser-item-closer {
        @include transition-all;
        width: 100%;
        cursor: pointer;
        height: 36px;
        font-size: 12px;
        border: #ddd solid 1px;
        border-top: none;
        box-sizing: border-box;
        position: relative;
        &:before {
            box-shadow: 0 0 15px #999;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            content: '';
            z-index: 0;
        }

        .pl-markdown-parser-item-closer-content {
            background-color: white;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 1;
            box-sizing: border-box;
            padding: 0 12px;
        }

        .pl-markdown-parser-item-closer-inner {
            transform: scale(0.8);
            width: fit-content;
            border: solid 1px #ddd;
            display: inline-block;
            padding: 6px 24px;
            border-radius: 100px;
        }
        &:hover {
            .pl-markdown-parser-item-closer-inner {
                background: #f9f9f9;
            }
        }
        .pl-icon {
            margin-left: 1em;
        }
        &.pl-markdown-parser-item-closer-open {
            .pl-markdown-parser-item-closer-inner {
                background: #f9f9f9;
            }
        }
        &.pl-markdown-parser-item-closer-fixed {
            position: fixed !important;
            bottom: 0;
            .pl-markdown-parser-item-closer-inner {
                background: $color-primary;
                color: white;
            }
        }
        .pl-markdown-parser-item-closer-left, .pl-markdown-parser-item-closer-right {
            min-width: 100px;
        }
        .pl-markdown-parser-item-closer-right {
            text-align: right;
        }
    }
</style>