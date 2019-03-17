<template>
    <div class="pl-markdown-parser-item-demo">
        <div class="pl-markdown-parser-item-demo-example" :style="exampleStyles" :class="exampleClasses">
            <div class="pl-markdown-parser-item-demo-left" :style="{width:`${leftWidth}px`}">
                <pl-markdown-parser-example :html="data.html" :js="data.js" :css="data.css"/>
                <div class="pl-markdown-parser-item-demo-left-label">
                    <div class="pl-markdown-parser-item-demo-left-label-title-wrapper">
                        <div class="pl-markdown-parser-item-demo-left-label-title-wrapper-center">
                            {{data.setting.title}}
                        </div>
                        <div class="pl-markdown-parser-item-demo-left-label-title-wrapper-right"></div>
                    </div>
                    <div class="pl-markdown-parser-item-demo-left-desc">
                        <pl-markdown :value="data.desc"/>
                    </div>
                </div>
            </div>
            <div class="pl-markdown-parser-item-demo-right" ref="code" :style="{left:`${leftWidth}px`,width:`calc(100% - ${leftWidth}px)`}">
                <pl-scroll :scroll-y="false" scroll-x>
                    <pl-markdown :value="markedCode"/>
                </pl-scroll>
            </div>
            <div class="pl-markdown-parser-item-demo-example-operator">
                <pl-icon icon="pl-scan" hover @click="showInDialog" v-link-tooltip="{content:'放大显示',placement:'top'}"/>
            </div>
        </div>
        <pl-markdown-parser-item-closer @click="p_toggle" :show="openable" :open="p_open" :left-width="leftWidth"/>
        <pl-markdown-parser-item-closer :left-width="leftWidth"
                                        open
                                        v-show="p_showFixedCloser"
                                        is-fixed
                                        :client-left="p_clientLeft"
                                        :client-width="p_clientWidth"
                                        @click="p_toggle"/>
    </div>
</template>

<script>
    import PlMarkdown from "./pl-markdown";
    import PlMarkdownParserExample from "./pl-markdown-parser-example";
    import PlMarkdownParserItemCloser from "./pl-markdown-parser-item-closer";
    import PlScroll from "../scroll/pl-scroll";
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-markdown-parser-item-demo",
        components: {PlIcon, PlScroll, PlMarkdownParserItemCloser, PlMarkdownParserExample, PlMarkdown},
        props: {
            data: {},                                                   //当前示例的数据
            leftWidth: {},                                              //示例左侧宽度
            screenHeight: {},                                           //网页宽度
        },
        data() {
            return {
                parser: null,                                           //父组件pl-markdown-parser
                p_open: false,                                          //当前是否为打开状态
                p_codeHeight: null,                                     //代码块的高度
                p_minHeight: (this.data.setting.minHeight - 0) || 140,  //示例最小高度
                p_showFixedCloser: false,                               //当前是否展示底部固定器
                p_clientLeft: null,                                     //当前示例距离网页左侧的距离
                p_clientWidth: null,                                    //当前示例宽度
            }
        },
        mounted() {
            this.p_codeHeight = this.$refs.code.offsetHeight
            this.parser = this.$plain.$dom.findComponentUpward(this, 'pl-markdown-parser')
            this.parser.$on('scroll', this.p_resetFixedCloser)
        },
        computed: {
            /*是否可展开*/
            openable() {
                return !!this.rightHeight && this.rightHeight >= this.p_minHeight
            },
            /*右边部分内容实际高度*/
            rightHeight() {
                if (!this.p_codeHeight) return null
                return this.p_codeHeight + 20
            },
            /*代码markdown文本*/
            markedCode() {
                if (!this.data) return null
                let ret = []
                if (!!this.data.html) ret.push(`\`\`\` html ${this.data.html} \`\`\``)
                if (!!this.data.js) ret.push(`\`\`\` javascript ${this.data.js} \`\`\``)
                if (!!this.data.css) ret.push(`\`\`\` css ${this.data.css} \`\`\``)
                return ret.join("\n")
            },
            /*示例代码样式*/
            exampleStyles() {
                const ret = {}
                if (!this.rightHeight) return ret
                let height;
                if (this.rightHeight < this.p_minHeight) {
                    this.p_open = true
                    height = this.p_minHeight
                }
                else
                    height = this.p_open ? (this.rightHeight + 40) : this.p_minHeight
                ret.height = height + 'px'
                return ret
            },
            /*示例代码绑定class*/
            exampleClasses() {
                return {
                    'pl-markdown-parser-item-demo-example-openable': this.openable,
                    'pl-markdown-parser-item-demo-example-open': this.p_open,
                }
            },
        },
        methods: {
            /*
             *  重新设置固定的关闭其的位置
             *  @author     martsforever
             *  @datetime   2019/3/16 22:24
             */
            p_resetFixedCloser() {
                const documentHeight = document.body.clientHeight
                const {clientHeight, clientWidth} = this.$el
                const {top: clientTop, left: clientLeft} = this.$el.getBoundingClientRect()
                this.p_clientWidth = clientWidth
                this.p_clientLeft = clientLeft
                if ((documentHeight > clientTop && clientHeight + clientTop > documentHeight) && this.p_open) {
                    this.p_showFixedCloser = true
                } else {
                    this.p_showFixedCloser = false
                }
            },
            /*
             *  处理切换开关动作
             *  @author     martsforever
             *  @datetime   2019/3/16 22:24
             */
            async p_toggle() {
                this.p_open = !this.p_open
                await this.$plain.$utils.delay(500)
                this.parser.$emit('scroll')
            },
            /*
             *  在对话框中显示代码块
             *  @author     martsforever
             *  @datetime   2019/3/16 22:25
             */
            showInDialog() {
                this.$emit('showInDialog', this.markedCode)
            },
        }
    }
</script>

<style lang="scss">
    $padding: 20px;
    $border-color: #ddd;
    .pl-markdown-parser-item-demo {
        .pl-markdown-parser-item-demo-example {
            font-size: 14px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            border: solid 0.5px $border-color;
            border-bottom: none;
            @include transition-all-cubic-bezier;
            transition-duration: 0.5s;
            .pl-markdown-parser-item-demo-left {
                position: absolute;
                top: 0;
                bottom: 0;
                box-sizing: border-box;
                padding: $padding 0;
                display: inline-block;
                &:after {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    width: 1px;
                    border-right: dashed 1px $border-color;
                    content: '';
                }
                .pl-markdown-parser-item-demo-left-label {
                    margin-top: $padding;
                    .pl-markdown-parser-item-demo-left-label-title-wrapper {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        line-height: 14px;
                        .pl-markdown-parser-item-demo-left-label-title-wrapper-right {
                            flex: 1;
                        }
                        .pl-markdown-parser-item-demo-left-label-title-wrapper-center {
                            padding: 0 15px;
                            color: $color-primary;
                        }
                        .pl-markdown-parser-item-demo-left-label-title-wrapper-right {
                            border: dashed 0.5px $border-color;
                        }
                    }
                }
                .pl-markdown-parser-example, .pl-markdown-parser-item-demo-left-desc {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 0 $padding;
                }

            }
            .pl-markdown-parser-item-demo-right {
                position: relative;
                display: inline-block;
                padding: $padding;
                box-sizing: border-box;
                overflow: auto;
                min-height: calc(100% - 36px);
            }

            .pl-markdown-parser-item-demo-example-operator {
                position: absolute;
                top: 0;
                right: 0;
                height: 30px;
                padding: 0 6px;
                display: flex;
                align-items: center;
            }
            &.pl-markdown-parser-item-demo-example-openable:hover {
                .pl-markdown-parser-item-demo-example-toggle {
                    opacity: 1;
                }
            }
        }
    }
</style>