<template>
    <div class="demo-markdown-parser">
        <pl-markdown-parser :value="markdown"/>
    </div>
</template>

<script>
    import PlMarkdownParser from "../../../src/components/markdown-parser/pl-markdown-parser";

    export default {
        name: "demo-markdown-parser",
        components: {PlMarkdownParser},
        data() {
            return {
                markdown: null,
            }
        },
        async created() {
            this.markdown = await this.p_decodeFile()
        },
        methods: {
            /**
             * 获取要渲染的markdown文件
             * @author  韦胜健
             * @date    2019/3/13 19:34
             */
            async p_decodeFile() {
                return new Promise((rs, rj) => import(`demo/md/button.md`).then(module => rs(module.default)).catch(rj))
            },
        }
    }
</script>

<style lang="scss">
    .demo-markdown-parser {
    }
</style>