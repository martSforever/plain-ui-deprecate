<template>
    <div class="demo-block">
        <demo-block-item v-for="(item,index) in blocks" :key="index" :block="item"/>
    </div>
</template>

<script>

    import DemoBlockItem from "./demo-block-item";

    export default {
        name: "demo-block",
        components: {DemoBlockItem},
        props: {
            file: {type: String, default: 'button.md'},
        },
        async created() {
            const blocks = await this.p_getBlocks()
            console.log(blocks)
            this.blocks = blocks
        },
        data() {
            return {
                blocks: [],
            }
        },
        methods: {
            /**
             * 获取要渲染的markdown文件
             * @author  韦胜健
             * @date    2019/3/13 19:34
             */
            async p_decodeFile() {
                return new Promise((rs, rj) => {
                    import(`demo/md/${this.file}`)
                        .then(module => {
                            rs(module.default)
                        }).catch(rj)
                })
            },
            /**
             * 获取代码块
             * @author  韦胜健
             * @date    2019/3/13 19:36
             */
            async p_getBlocks() {

                // const maxIterate = 10
                // let count = 0

                let blocksText = await this.p_decodeFile()
                let demos = []
                const startTag = ':::demo-start'
                const endTag = ':::demo-end'
                const splitTag = ":::demo"
                let demoStartIndex = blocksText.indexOf(startTag)
                let demoEndIndex = blocksText.indexOf(endTag, demoStartIndex + startTag.length) + endTag.length
                while (demoStartIndex > -1) {
                    // while (demoStartIndex > -1 && count < maxIterate) {
                    //     count++
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
                ret.push(tests[tests.length - 1])
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
                ]
                const result = types.reduce((ret, {key, start, end}) => {
                    const {content: itemContent, block: newContent} = this.p_decodeBlockType(content, {start, end})
                    content = newContent
                    ret[key] = itemContent
                    return ret
                }, {})
                result.md = content
                return result
            },
            /**
             * 解析某种类型的的diamante块
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
        }
    }
</script>

<style lang="scss">

</style>