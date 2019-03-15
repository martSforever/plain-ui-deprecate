<template>
    <div class="pl-markdown-parser-item">
        <div class="pl-markdown-parser-item-example" v-if="data.isDemo" :style="exampleStyles" :class="exampleClasses">
            <div class="pl-markdown-parser-item-left" :style="{width:`${leftWidth}px`}">
                <pl-markdown-parser-example :html="data.html" :js="data.js" :css="data.css"/>
                <div class="pl-markdown-parser-item-left-label">
                    <div class="pl-markdown-parser-item-left-label-title-wrapper">
                        <div class="pl-markdown-parser-item-left-label-title-wrapper-left"></div>
                        <div class="pl-markdown-parser-item-left-label-title-wrapper-center">
                            {{data.title}}
                        </div>
                        <div class="pl-markdown-parser-item-left-label-title-wrapper-right"></div>
                    </div>
                    <div class="pl-markdown-parser-item-left-desc">
                        <div>p_showFixedCloser{{p_showFixedCloser}}</div>
                        <pl-markdown :value="data.desc"/>
                    </div>
                </div>
            </div>
            <div class="pl-markdown-parser-item-right" ref="code" :style="{left:`${leftWidth}px`,width:`calc(100% - ${leftWidth}px)`}">
                <pl-markdown :value="markedCode"/>
            </div>
            <pl-markdown-parser-item-closer @click="p_toggle" :show="openable" :open="p_open" :left-width="leftWidth"/>
        </div>
        <pl-markdown-parser-item-closer show
                                        :left-width="leftWidth"
                                        open
                                        v-show="p_showFixedCloser"
                                        is-fixed
                                        :client-left="12"
                                        :client-width="p_clientWidth"
                                        @click="p_toggle"/>
    </div>
</template>

<script>
    import PlMarkdown from "./pl-markdown";
    import PlMarkdownParserExample from "./pl-markdown-parser-example";
    import PlMarkdownParserItemCloser from "./pl-markdown-parser-item-closer";

    export default {
        name: "pl-markdown-parser-item",
        components: {PlMarkdownParserItemCloser, PlMarkdownParserExample, PlMarkdown},
        props: {
            data: {},
            leftWidth: {},
            screenHeight: {},
        },
        created() {
            // console.log(this.data)
        },
        data() {
            return {
                parser: null,
                p_open: false,
                p_codeHeight: null,
                p_minHeight: (this.data.minHeight - 0) || 140,
                p_showFixedCloser: false,
                p_clientLeft: null,
                p_clientWidth: null,
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
                if (!!this.data.html) ret.push(`\`\`\` html\n ${this.data.html} \n \`\`\``)
                if (!!this.data.js) ret.push(`\`\`\` javascript\n ${this.data.js} \n \`\`\``)
                if (!!this.data.css) ret.push(`\`\`\` css\n ${this.data.css} \n \`\`\``)
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
                    'pl-markdown-parser-item-example-openable': this.openable,
                    'pl-markdown-parser-item-example-open': this.p_open,
                }
            },
        },
        methods: {
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
            async p_toggle() {
                this.p_open = !this.p_open
                await this.$plain.$utils.delay(500)
                this.parser.$emit('scroll')
            },
        }
    }
</script>

<style lang="scss">
    $padding: 20px;
    $border-color: #ddd;
    .pl-markdown-parser-item {
        .pl-markdown-parser-item-example {
            font-size: 14px;
            box-sizing: border-box;
            border-radius: 4px;
            position: relative;
            border: dashed 1px $border-color;
            margin-bottom: 20px;
            overflow: hidden;
            @include transition-all-cubic-bezier;
            transition-duration: 0.5s;
            .pl-markdown-parser-item-left {
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
                .pl-markdown-parser-item-left-label {
                    margin-top: $padding;
                    .pl-markdown-parser-item-left-label-title-wrapper {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        font-weight: 600;
                        line-height: 14px;
                        .pl-markdown-parser-item-left-label-title-wrapper-left {
                            width: $padding;
                        }
                        .pl-markdown-parser-item-left-label-title-wrapper-right {
                            flex: 1;
                        }
                        .pl-markdown-parser-item-left-label-title-wrapper-center {
                            padding: 0 12px;
                        }
                        .pl-markdown-parser-item-left-label-title-wrapper-left, .pl-markdown-parser-item-left-label-title-wrapper-right {
                            background-color: $border-color;
                            height: 1px;
                        }
                    }
                }
                .pl-markdown-parser-example, .pl-markdown-parser-item-left-desc {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 0 $padding;
                }
            }
            .pl-markdown-parser-item-right {
                position: relative;
                display: inline-block;
                padding: $padding;
                box-sizing: border-box;
                overflow: auto;
                min-height: calc(100% - 36px);
            }

            &.pl-markdown-parser-item-example-openable:hover {
                .pl-markdown-parser-item-example-toggle {
                    opacity: 1;
                }
            }
        }
    }
</style>