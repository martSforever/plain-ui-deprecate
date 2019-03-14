<template>
    <div class="pl-markdown-parser-item">
        <div class="pl-markdown-parser-item-example" v-if="data.isDemo">
            <!-- <div class="pl-markdown-parser-item-title" v-if="!!data.title">{{data.title}}</div>
         <div class="pl-markdown-parser-item-desc" v-if="!!data.desc">
             <pl-markdown :value="data.desc"/>
         </div>-->
            <!--<div class="pl-markdown-parser-item-md" v-if="!!data.md">
                <pl-markdown :value="data.md"/>
            </div>-->
            <div class="pl-markdown-parser-item-left">
                <pl-markdown-parser-example :html="data.html" :js="data.js" :css="data.css"/>
            </div>
            <div class="pl-markdown-parser-item-right">
                <pl-markdown :value="markedCode"/>
            </div>
        </div>
    </div>
</template>

<script>
    import PlMarkdown from "./pl-markdown";
    import PlMarkdownParserExample from "./pl-markdown-parser-example";

    export default {
        name: "pl-markdown-parser-item",
        components: {PlMarkdownParserExample, PlMarkdown},
        props: {
            data: {},
        },
        created() {
            // console.log(this.data)
        },
        computed: {
            markedCode() {
                if (!this.data) return null
                let ret = []
                if (!!this.data.html) ret.push(`\`\`\` html ${this.data.html} \n \`\`\``)
                if (!!this.data.js) ret.push(`\`\`\` javascript ${this.data.js} \n \`\`\``)
                if (!!this.data.css) ret.push(`\`\`\` css ${this.data.css} \n \`\`\``)
                return ret.join("\n")
            },
        },
    }
</script>

<style lang="scss">
    $left-width: 500px;
    .pl-markdown-parser-item {

        .pl-markdown-parser-item-example {
            font-size: 14px;
            box-sizing: border-box;
            border-radius: 3px;
            padding: 12px;
            position: relative;
            border: dashed 1px #ddd;
            margin-bottom: 20px;
            @include transition-all;
            &:hover {
                box-shadow: 0 0 15px #ddd;
                border-color: transparent;
            }

            .pl-markdown-parser-item-left {
                width: $left-width;
                position: absolute;
                top: 0;
                bottom: 0;
                box-sizing: border-box;
                padding: 12px 0;
                display: inline-block;
                &:after {
                    position: absolute;
                    top: 12px;
                    bottom: 12px;
                    right: 0;
                    width: 1px;
                    border-right: dashed 1px #ddd;
                    content: '';
                }
            }
            .pl-markdown-parser-item-right {
                width: calc(100% - #{$left-width});
                position: relative;
                left: $left-width;
                display: inline-block;
                padding: 0 12px;
                box-sizing: border-box;
            }
        }
    }
</style>