<template>
    <div class="demo-block">
        <demo-block-example v-for="(item,index) in blocks" :key="index" :html="item.html" :js="item.js" :css="item.css"/>
    </div>
</template>

<script>

    import DemoBlockExample from "./demo-block-example";
    export default {
        name: "demo-block",
        components: {DemoBlockExample},
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
                const blocksText = await  this.p_decodeFile()
                const blocks = blocksText.split("---")
                return blocks.map(block => this.p_decodeBlock(block))
            },
            /**
             * 解析代码块
             * @author  韦胜健
             * @date    2019/3/13 19:36
             */
            p_decodeBlock(block) {
                let types = ['html', 'js', 'css']
                const result = types.reduce((ret, item) => {
                    const {content, block: newBlock} = this.p_decodeBlockType(block, item)
                    block = newBlock
                    ret[item] = content
                    return ret
                }, {})
                result.md = block
                return result
            },
            /**
             * 解析某种类型的的diamante块
             * @author  韦胜健
             * @date    2019/3/13 19:49
             */
            p_decodeBlockType(block, codeType) {
                let type = '```' + codeType
                let startIndex = block.indexOf(type), endIndex, content
                if (startIndex > -1) {
                    endIndex = block.indexOf('```', startIndex + type.length) + 3
                    content = block.substring(startIndex, endIndex)
                    block = block.replace(content, '')
                    content = content.replace(type, '')
                    content = content.replace('```', '')
                }
                return {content, block}
            },
        }
    }
</script>

<style lang="scss">

</style>