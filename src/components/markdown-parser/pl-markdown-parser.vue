<template>
    <div class="pl-markdown-parser">
        <pl-scroll class="pl-markdown-parser-scroll" @scroll="e=>$emit('scroll',e)">
            <div class="pl-markdown-parser-wrapper">
                <div class="pl-markdown-parser-demo-wrapper">
                    <div v-for="(item,index) in demos" :key="index" :data="item">
                        <pl-markdown-parser-item :data="item"
                                                 v-if="item.isDemo"
                                                 :left-width="leftWidth"
                                                 :screen-height="screenHeight"
                                                 @showInDialog="p_showInDialog"
                                                 @created="p_itemCreated"
                                                 @destroyed="p_itemDestroyed"/>
                        <pl-markdown :value="item.md" v-else/>
                    </div>
                </div>
                <div class="pl-markdown-parser-nav" :style="navStyles" ref="nav">
                    <div class="pl-markdown-parser-nav-item"
                         :class="{'pl-markdown-parser-nav-item-active':position === index}"
                         v-for="(item,index) in navs"
                         :key="index"
                         @click="position = index">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="pl-markdown-parser-nav-slider">
                        <div class="pl-markdown-parser-nav-slider-indicator" :style="{top:`${position*28+9}px`}">
                            <pl-icon icon="pl-radio-on"/>
                        </div>
                    </div>
                </div>
            </div>
        </pl-scroll>
        <pl-dialog width="650px" height="300px" v-model="dialogShow">
            <pl-scroll scroll-x scroll-y>
                <pl-markdown :value="code"/>
            </pl-scroll>
        </pl-dialog>
    </div>
</template>

<script>
    import PlMarkdownParserItem from "./pl-markdown-parser-item";
    import PlMarkdown from "./pl-markdown";
    import PlMarkdownParserItemCloser from "./pl-markdown-parser-item-closer";
    import PlScroll from "../scroll/pl-scroll";
    import PlDialog from "../dialog/pl-dialog";
    import PlIcon from "../icon/pl-icon";
    import {MountedMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-markdown-parser",
        components: {PlIcon, PlDialog, PlScroll, PlMarkdownParserItemCloser, PlMarkdown, PlMarkdownParserItem},
        mixins: [MountedMixin],
        props: {
            value: {},
            leftWidth: {type: Number, default: 300},
        },
        watch: {
            value: {
                immediate: true,
                async handler(val) {
                    this.demos = await this.p_decodeValue(val)
                },
            },
        },
        data() {
            return {
                demos: [],                                          //解析得到的demo数据
                screenHeight: window.screen.height,                 //屏幕高度
                dialogShow: false,                                  //显示代码块的对话框是否展示
                code: null,                                         //对话框展示的代码块
                position: 0,                                        //当前nav导航展示的demo的索引位置
            }
        },
        computed: {
            navs() {
                return this.demos.filter(item => item.isDemo)
            },
            navStyles() {
                if (!this.p_mounted) return null
                const {left, top} = this.$refs.nav.getBoundingClientRect()
                return {
                    position: 'fixed',
                    top: `${top}px`,
                    left: `${left}px`,
                    right: null,
                }
            },
        },
        methods: {
            /*
             *  解析markdown文本字符串
             *  @author     martsforever
             *  @datetime   2019/3/14 22:40
             */
            p_decodeValue(val) {
                if (!val) return []
                let blocksText = val
                let demos = []
                const startTag = ':::demo-start'
                const endTag = ':::demo-end'
                const splitTag = ":::demo"
                let demoStartIndex = blocksText.indexOf(startTag)
                let demoEndIndex = blocksText.indexOf(endTag, demoStartIndex + startTag.length) + endTag.length
                while (demoStartIndex > -1) {
                    const blockText = blocksText.substring(demoStartIndex, demoEndIndex)
                    demos.push(blockText.replace(startTag, '').replace(endTag, ''))
                    blocksText = blocksText.replace(blockText, splitTag)
                    demoStartIndex = blocksText.indexOf(startTag)
                    demoEndIndex = blocksText.indexOf(endTag, demoStartIndex + startTag.length) + endTag.length
                }
                const tests = blocksText.split(splitTag)
                const ret = demos.reduce((ret, demo, index) => {
                    ret.push({
                        content: tests[index],
                        isDemo: false
                    })
                    ret.push({
                        content: demos[index],
                        isDemo: true
                    })
                    return ret
                }, [])
                ret.push({
                    isDemo: false,
                    content: tests[tests.length - 1]
                })
                return ret.map(item => this.p_decodeBlock(item))
            },
            /**
             * 解析代码块
             * @author  韦胜健
             * @date    2019/3/13 19:36
             */
            p_decodeBlock({content, isDemo}) {
                if (!isDemo) return {md: content}
                let types = [
                    {key: "html", start: '```html', end: '```'},
                    {key: "js", start: '```js', end: '```'},
                    {key: "css", start: '```css', end: '```'},
                    {key: "title", start: ':::title-start', end: ':::title-end'},
                    {key: "desc", start: ':::desc-start', end: ':::desc-end'},
                    {key: "minHeight", start: ':::min-height-start', end: ':::min-height-end'},
                ]
                const result = types.reduce((ret, {key, start, end}) => {
                    const {content: itemContent, block: newContent} = this.p_decodeBlockType(content, {start, end})
                    content = newContent
                    ret[key] = itemContent
                    return ret
                }, {})
                result.md = content
                result.isDemo = isDemo
                return result
            },
            /**
             * 解析某种类型的的代码块
             * @author  韦胜健
             * @date    2019/3/13 19:49
             */
            p_decodeBlockType(block, {start, end}) {
                let startIndex = block.indexOf(start), endIndex, content
                if (startIndex > -1) {
                    endIndex = block.indexOf(end, startIndex + start.length) + end.length
                    content = block.substring(startIndex, endIndex)
                    block = block.replace(content, '')
                    content = content.replace(start, '')
                    content = content.replace(end, '')
                }
                return {content, block}
            },
            /*
             *  在对话框中显示源码
             *  @author     martsforever
             *  @datetime   2019/3/16 20:37
             */
            p_showInDialog(code) {
                this.code = code
                this.dialogShow = true
            },
        },
    }
</script>

<style lang="scss">
    $nav-padding: 12px;
    .pl-markdown-parser {
        @include public-style;
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        .pl-markdown-parser-wrapper {
            width: 800px;
            padding: 12px;
            box-sizing: border-box;
            position: relative;
            .pl-markdown-parser-nav {
                position: absolute;
                top: $nav-padding;
                width: 200px;
                right: -200px - $nav-padding*3;
                padding: 0 12px;
                user-select: none;
                .pl-markdown-parser-nav-item {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: $nav-padding;
                    cursor: pointer;
                    &:not(:first-child) {
                        margin-top: 12px;
                    }
                    &:hover {
                        color: $color-primary;
                    }
                    &.pl-markdown-parser-nav-item-active {
                        color: $color-primary;
                    }
                }
                .pl-markdown-parser-nav-slider {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 1px;
                    background-color: #c5def7;
                    .pl-markdown-parser-nav-slider-indicator {
                        @include transition-all-cubic-bezier;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 1px;
                        height: 1px;
                        color: $color-primary;
                        position: absolute;
                    }
                }
            }
        }

    }
</style>