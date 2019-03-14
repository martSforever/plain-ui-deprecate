<template>
    <div class="demo-block-item">
        <demo-block-example :html="block.html" :js="block.js" :css="block.css"/>
        <pl-markdown :value="markedCode"/>
    </div>
</template>
<script>
    import DemoBlockExample from "./demo-block-example";
    import PlMarkdown from "../src/components/markdown-parser/pl-markdown";

    export default {
        name: "demo-block-item",
        components: {PlMarkdown, DemoBlockExample},
        props: {
            block: {},
        },
        computed: {
            markedCode() {
                let ret = []
                if (!!this.block.html) ret.push(`\`\`\` html ${this.block.html} \n \`\`\``)
                if (!!this.block.js) ret.push(`\`\`\` javascript ${this.block.js} \n \`\`\``)
                if (!!this.block.css) ret.push(`\`\`\` css ${this.block.css} \n \`\`\``)
                return ret.join("\n")
            },
        }
    }
</script>

<style lang="scss">

</style>