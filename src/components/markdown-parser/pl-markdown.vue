<template>
    <div v-html="formatString" class="pl-markdown"></div>
</template>

<script>
    import marked from 'marked'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/default.css';

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(lang, code, true).value;
            } else {
                return hljs.highlightAuto(code).value;
            }
        }
    });

    export default {
        name: "pl-markdown",
        props: {
            value: {type: String},
        },
        computed: {
            formatString() {
                return marked(this.value || '', {sanitize: true});
            }
        }
    }
</script>

<style lang="scss">
    .pl-markdown {
        border-radius: 3px;
        width: fit-content;
        @include public-style;
        & > pre {
            margin: 0;
            &:not(:last-child) {
                margin-bottom: 12px;
            }
        }
        code {
            font-family: Consolas, Menlo, Courier, monospace;
            display: block;
            overflow-x: auto;
            color: #525252;
            -webkit-text-size-adjust: none;
            margin: 0;
            border: none;
            font-size: 1em;
            border-radius: 3px;
            letter-spacing: 1px;
            line-height: 1.5em;

            & > * {
                box-sizing: border-box;
            }

            .hljs-name {
                color: $color-primary;
            }
            .hljs-attr {
                color: $color-warn;
            }
            .hljs-string {
                color: $color-success;
            }
        }
    }
</style>