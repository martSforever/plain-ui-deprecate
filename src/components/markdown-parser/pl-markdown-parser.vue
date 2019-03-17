<template>
    <div class="pl-markdown-parser">
        <pl-scroll class="pl-markdown-parser-scroll" @scroll="p_scroll" ref="scroll">
            <div class="pl-markdown-parser-wrapper">
                <div class="pl-markdown-parser-demo-wrapper">
                    <pl-markdown-parser-item v-for="(item,index) in blocks"
                                             :key="index"
                                             :data="item"
                                             :index="index"
                                             ref="parserItems"
                                             :screen-height="screenHeight"
                    />
                </div>
                <div class="pl-markdown-parser-nav" :style="navStyles" ref="nav">
                    <template v-for="(item,index) in blocks">
                        <template v-if="!!item.setting.title && (item.setting.nav !== false)">
                            <div class="pl-markdown-parser-nav-item"
                                 :class="{'pl-markdown-parser-nav-item-active':position === index}"
                                 :key="index"
                                 @click="p_clickNavItem(index)">
                                <!--{{index}}-{{position}}- -->
                                <span>{{item.setting.title}}</span>
                            </div>
                        </template>
                    </template>
                    <div class="pl-markdown-parser-nav-slider">
                        <div class="pl-markdown-parser-nav-slider-indicator" :style="navIndicatorStyles">
                            <pl-icon icon="pl-radio-on"/>
                        </div>
                    </div>
                </div>
            </div>
        </pl-scroll>
        <pl-dialog width="800px" height="400px" v-model="dialogShow">
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
        },
        watch: {
            value: {
                immediate: true,
                async handler(val) {
                    this.blocks = await this.p_decodeValue(val)
                    for (let i = 0; i < this.blocks.length; i++) {
                        const block = this.blocks[i];
                        if (!!block.setting.title && (block.setting.nav !== false)) {
                            this.position = i
                            break
                        }
                    }
                    console.log(this.blocks)
                },
            },
        },
        data() {
            return {
                blocks: [],                                         //解析得到的demo数据
                screenHeight: window.screen.height,                 //屏幕高度
                dialogShow: false,                                  //显示代码块的对话框是否展示
                code: null,                                         //对话框展示的代码块
                position: 0,                                        //当前nav导航展示的demo的索引位置
                listenScroll: true,                                 //是否监听滚动事件
            }
        },
        computed: {
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
            navIndicatorStyles() {
                let position = 0;
                for (let i = 0; i < this.blocks.length; i++) {
                    const item = this.blocks[i];
                    if (!!item.setting.title && (item.setting.nav !== false)) position++
                    if (this.position === i) {
                        break
                    }
                }
                return {
                    top: `${(position - 1) * 28 + 9}px`
                }
            },
            navBoundary() {
                let start, end;
                for (let i = 0; i < this.blocks.length; i++) {
                    const item = this.blocks[i];
                    if (!!item.setting.title && (item.setting.nav !== false)) {
                        start = i
                        break
                    }
                }
                for (let i = this.blocks.length - 1; i >= 0; i--) {
                    const item = this.blocks[i];
                    if (!!item.setting.title && (item.setting.nav !== false)) {
                        end = i
                        break
                    }
                }
                return {start, end}
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
                let blocks = []
                const startTag = ':::block-start'
                const endTag = ':::block-end'
                const splitTag = ":::block"
                let demoStartIndex = blocksText.indexOf(startTag)
                let demoEndIndex = blocksText.indexOf(endTag, demoStartIndex + startTag.length) + endTag.length
                while (demoStartIndex > -1) {
                    const blockText = blocksText.substring(demoStartIndex, demoEndIndex)
                    blocks.push(blockText.replace(startTag, '').replace(endTag, ''))
                    blocksText = blocksText.replace(blockText, splitTag)
                    demoStartIndex = blocksText.indexOf(startTag)
                    demoEndIndex = blocksText.indexOf(endTag, demoStartIndex + startTag.length) + endTag.length
                }
                const tests = blocksText.split(splitTag)
                const ret = blocks.reduce((ret, demo, index) => {
                    ret.push({
                        content: tests[index],
                        isBlock: false
                    })
                    ret.push({
                        content: blocks[index],
                        isBlock: true
                    })
                    return ret
                }, [])
                ret.push({
                    isBlock: false,
                    content: tests[tests.length - 1]
                })
                return ret.map(item => this.p_decodeBlock(item)).filter(item => !!item.isBlock || item.md.trim() !== '')
            },
            /**
             * 解析代码块
             * @author  韦胜健
             * @date    2019/3/13 19:36
             * @param   content             字符串内容
             * @param   isBlock             是否为特殊块
             */
            p_decodeBlock({content, isBlock}) {
                if (!isBlock) return {md: content, setting: {}, isBlock: false,}

                /*解析结果*/
                let ret = {}
                /*需要收集的标签*/
                let types = [
                    {key: "html", start: '```html', end: '```'},
                    {key: "js", start: '```js', end: '```'},
                    {key: "css", start: '```css', end: '```'},
                ]

                /*获取设置参数内容*/
                let {value, newContent} = this.p_decodeBlockType(content, {start: ':::setting-start', end: ':::setting-end'})
                content = newContent
                ret.setting = value
                /*解析参数内容*/
                if (!!ret.setting) {
                    ret.setting = ret.setting.trim().split('\n').reduce((result, item) => {
                        const separatorIndex = item.indexOf(":")
                        let key = item.substring(0, separatorIndex)
                        let value = item.substring(separatorIndex + 1)
                        result[key] = eval(value)
                        return result
                    }, {})
                    !!ret.setting.collect && ret.setting.collect.forEach(item => {
                        types.push({
                            key: item,
                            start: `:::${item}-start`,
                            end: `:::${item}-end`,
                        })
                    })
                } else {
                    ret.setting = {}
                }

                /*解析types中的标签*/
                ret = Object.assign(ret, types.reduce((result, {key, start, end}) => {
                    let {value, newContent} = this.p_decodeBlockType(content, {start, end})
                    content = newContent
                    result[key] = value
                    return result
                }, {}))
                ret.md = content
                ret.isBlock = isBlock
                return ret
            },
            /**
             * 解析某种类型的的代码块
             * @author  韦胜健
             * @date    2019/3/13 19:49
             */
            p_decodeBlockType(block, {start, end}) {
                block = block.trim()
                let startIndex = block.indexOf(start), endIndex, content
                if (startIndex > -1) {
                    endIndex = block.indexOf(end, startIndex + start.length) + end.length
                    content = block.substring(startIndex, endIndex)
                    block = block.replace(content, '')
                    content = content.replace(start, '')
                    content = content.replace(end, '')
                }
                return {value: content, newContent: block}
            },
            /*
             *  在对话框中显示源码
             *  @author     martsforever
             *  @datetime   2019/3/16 20:37
             */
            showInDialog(code) {
                this.code = code
                this.dialogShow = true
            },
            /*
             *  处理滚动事件
             *  @author     martsforever
             *  @datetime   2019/3/16 23:47
             */
            p_scroll(e) {
                if (!this.listenScroll) return
                this.$emit('scroll', e)
                this.p_clearTimer()
                this.timer = setTimeout(() => {
                    for (let i = 0; i < this.$refs.parserItems.length; i++) {
                        const parserItem = this.$refs.parserItems[i];
                        if (parserItem.$el.offsetTop >= e.target.scrollTop + 20) {
                            this.position = Math.max(Math.min(this.navBoundary.end, i), this.navBoundary.start)
                            break
                        }
                    }
                }, 200)

            },
            p_clearTimer() {
                if (!!this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
            },
            /*
             *  处理点击导航选项事件
             *  @author     martsforever
             *  @datetime   2019/3/16 22:44
             */
            async p_clickNavItem(val) {
                this.p_clearTimer()
                this.listenScroll = false
                this.$refs.scroll.scrollTo({y: this.$refs.parserItems[val].$el.offsetTop})
                this.position = Math.max(Math.min(this.navBoundary.end, val), this.navBoundary.start)
                await this.$plain.$utils.delay(1000)
                this.listenScroll = true
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