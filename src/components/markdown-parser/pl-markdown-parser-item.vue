<template>
    <div class="pl-markdown-parser-item">
        <div class="pl-markdown-parser-item-example" v-if="data.isDemo" :style="exampleStyles" :class="exampleClasses">
            <!-- <div class="pl-markdown-parser-item-title" v-if="!!data.title">{{data.title}}</div>
         <div class="pl-markdown-parser-item-desc" v-if="!!data.desc">
             <pl-markdown :value="data.desc"/>
         </div>-->
            <!--<div class="pl-markdown-parser-item-md" v-if="!!data.md">
                <pl-markdown :value="data.md"/>
            </div>-->
            <div class="pl-markdown-parser-item-left">
                <pl-markdown-parser-example :html="data.html" :js="data.js" :css="data.css"/>
                <div class="pl-markdown-parser-item-left-label">
                    <div class="pl-markdown-parser-item-left-label-title-wrapper">
                        <div class="pl-markdown-parser-item-left-label-title-wrapper-left"></div>
                        <div class="pl-markdown-parser-item-left-label-title-wrapper-center">
                            {{data.title}}
                        </div>
                        <div class="pl-markdown-parser-item-left-label-title-wrapper-right"></div>
                    </div>
                    <div class="pl-markdown-parser-item-left-desc">
                        <pl-markdown :value="data.desc"/>
                    </div>
                </div>
            </div>
            <div class="pl-markdown-parser-item-right" ref="code">
                <pl-markdown :value="markedCode"/>
            </div>
            <div class="pl-markdown-parser-item-example-toggle" @click="p_open = !p_open">
                <link-button :prefix-icon="!p_open?'pl-double-arrow-down':'pl-double-arrow-up'" icon-only box-color="info" box-type="none"/>
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
        data() {
            return {
                p_open: false,
                codeHeight: null,
                minHeight: this.data.minHeight || 200
            }
        },
        mounted() {
            this.codeHeight = this.$refs.code.offsetHeight + 24 + 100
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
            exampleStyles() {
                const ret = {}
                ret.height = (!!this.codeHeight && this.codeHeight > this.minHeight ? this.p_open ? this.codeHeight : this.minHeight : this.minHeight) + "px"
                return ret
            },
            exampleClasses() {
                return {
                    'pl-markdown-parser-item-example-openable': !!this.codeHeight && this.codeHeight > this.minHeight,
                    'pl-markdown-parser-item-example-open': this.p_open
                }
            },
        },
    }
</script>

<style lang="scss">
    $left-width: 500px;
    $padding: 12px;
    $border-color: #ddd;
    .pl-markdown-parser-item {

        .pl-markdown-parser-item-example {
            font-size: 14px;
            box-sizing: border-box;
            border-radius: 4px;
            padding: $padding;
            position: relative;
            border: dashed 1px $border-color;
            margin-bottom: 20px;
            overflow: hidden;
            @include transition-all-cubic-bezier;
            &:hover {
                box-shadow: 0 0 15px $border-color;
                border-color: transparent;
            }

            .pl-markdown-parser-item-left {
                width: $left-width;
                position: absolute;
                top: 0;
                bottom: 0;
                box-sizing: border-box;
                padding: $padding $padding 0 0;
                display: inline-block;
                &:after {
                    position: absolute;
                    top: 12px;
                    bottom: 12px;
                    right: 0;
                    width: 1px;
                    border-right: dashed 1px $border-color;
                    content: '';
                }
                .pl-markdown-parser-item-left-label {
                    margin-top: $padding*2;
                    .pl-markdown-parser-item-left-label-title-wrapper {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        font-size: 16px;
                        line-height: 16px;
                        .pl-markdown-parser-item-left-label-title-wrapper-left {
                            width: 25px;
                        }
                        .pl-markdown-parser-item-left-label-title-wrapper-right {
                            flex: 1;
                        }
                        .pl-markdown-parser-item-left-label-title-wrapper-center {
                            padding: 0 12px;
                        }
                        .pl-markdown-parser-item-left-label-title-wrapper-left, .pl-markdown-parser-item-left-label-title-wrapper-right {
                            background-color: $border-color;
                            height: 1px;
                        }
                    }
                }
            }
            .pl-markdown-parser-item-right {
                width: calc(100% - #{$left-width});
                position: relative;
                left: $left-width;
                display: inline-block;
                padding: 0 $padding;
                box-sizing: border-box;
            }

            .pl-markdown-parser-item-example-toggle {
                @include transition-all;
                cursor: pointer;
                height: 100px;
                position: absolute;
                bottom: -2px;
                left: -1px;
                right: -1px;
                background: linear-gradient(to top, rgba(#ddd, 0.3), transparent);
                opacity: 0;
                display: flex;
                align-items: flex-end;
                justify-content: center;
            }

            &.pl-markdown-parser-item-example-openable:hover {
                .pl-markdown-parser-item-example-toggle {
                    opacity: 1;
                }
            }
        }
    }
</style>