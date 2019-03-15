<template>
    <div class="pl-markdown-parser">
        <div v-for="(item,index) in demos" :key="index" :data="item">
            <pl-markdown-parser-item :data="item" v-if="item.isDemo"/>
            <pl-markdown :value="item.md" v-else/>
        </div>
    </div>
</template>

<script>
    import PlMarkdownParserItem from "./pl-markdown-parser-item";
    import PlMarkdown from "./pl-markdown";

    export default {
        name: "pl-markdown-parser",
        components: {PlMarkdown, PlMarkdownParserItem},
        props: {
            value: {},
        },
        watch: {
            value: {
                immediate: true,
                async handler(val) {
                    this.demos = await this.p_decodeValue(val)
                    // console.log(this.demos)
                },
            },
        },
        data() {
            return {
                demos: []
            }
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
        },
    }
</script>

<style lang="scss">
    .pl-markdown-parser {
        @include public-style;
        padding: 12px;
    }
</style>