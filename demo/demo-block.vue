<template>
    <div class="demo-block">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "demo-block",
        props: {
            file: {type: String, default: 'button.md'},
        },
        async created() {
            const blocks = await this.p_getBlocks()
            console.log(blocks)
        },
        methods: {
            async p_decodeFile() {
                return new Promise((rs, rj) => {
                    import(`demo/md/${this.file}`)
                        .then(module => {
                            rs(module.default)
                        }).catch(rj)
                })
            },
            async p_getBlocks() {
                const blocksText = await  this.p_decodeFile()
                const blocks = blocksText.split("---")
                return blocks.map(block => this.p_decodeBlock(block))
            },
            p_decodeBlock(block) {
                let types = ['html', 'js', 'scss']
                const result = types.reduce((ret, item) => {
                    const {content, block: newBlock} = this.p_decodeBlockType(block, item)
                    block = newBlock
                    ret[item] = content
                    return ret
                }, {})
                result.md = block
                return result
            },
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