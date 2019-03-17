<template>
    <transition name="pl-transition-fade">
        <div class="pl-markdown-parser-item-closer"
             @click="e=>$emit('click',e)"
             v-show="show"
             :style="styles"
             :class="{'pl-markdown-parser-item-closer-fixed':isFixed}">
            <div class="pl-markdown-parser-item-closer-inner">
                <span>显示全部</span>
                <pl-icon :icon="!open?'pl-double-arrow-down':'pl-double-arrow-up'"/>
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
            show: {type: Boolean, default: false},                          //是否需要展示关闭器
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
        box-sizing: border-box;
        border-top: none;
        display: flex;
        align-items: center;
        justify-content: center;

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
                background: $color-primary;
                color: white;
            }
        }
        .pl-icon {
            margin-left: 1em;
        }
        &.pl-markdown-parser-item-closer-fixed {
            position: fixed !important;
            background: linear-gradient(to top, rgba(#666, 0.5), transparent);
            .pl-markdown-parser-item-closer-inner {
                box-sizing: border-box;
                .pl-icon {
                    color: white !important;
                }
            }
        }
    }
</style>