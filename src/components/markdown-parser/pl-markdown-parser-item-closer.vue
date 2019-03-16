<template>
    <transition name="pl-transition-fade">
        <div class="pl-markdown-parser-item-closer" @click="e=>$emit('click',e)" v-show="show" :style="styles" :class="{'pl-markdown-parser-item-closer-fixed':isFixed}">
            <div class="pl-markdown-parser-item-closer-inner" :style="{width:`calc(100% - ${leftWidth}px)`}">
                <link-button :prefix-icon="!open?'pl-double-arrow-down':'pl-double-arrow-up'" icon-only box-type="none" box-color="info"/>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "pl-markdown-parser-item-closer",
        props: {
            show: {type: Boolean, default: false},                          //是否需要展示关闭器
            open: {type: Boolean, default: false},                          //当前是否处于打开状态
            leftWidth: {},                                                  //示例左侧内容宽度
            position: {type: String, default: 'absolute'},                  //关闭器的定位方式

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
        cursor: pointer;
        height: 28px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        &:hover {
            background: linear-gradient(to top, rgba(#999, 0.1), transparent);
        }
        .pl-markdown-parser-item-closer-inner {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            box-sizing: border-box;
            .pl-button {
                color: #b9b9b9 !important;
            }
        }
        &.pl-markdown-parser-item-closer-fixed {
            position: fixed !important;
            background: linear-gradient(to top, rgba(#666, 0.5), transparent);
            .pl-markdown-parser-item-closer-inner {
                box-sizing: border-box;
                .pl-button {
                    color: white !important;
                }
            }
        }
    }
</style>