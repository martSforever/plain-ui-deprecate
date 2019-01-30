<template>
    <div class="pl-mavon">
        <div class="pl-mavon-slot">
            <slot></slot>
        </div>
        <div class="pl-mavon-wrapper">
            <pl-collapse :title="title" v-model="p_show" disabledClickHead @clickHead="()=>!!p_show?close():open()">
                <div v-if="p_initialized">
                    <!--<mavon-editor :value="val"
                                  :box-shadow="false"
                                  default-open="preview"
                                  :subfield="false"
                                  :toolbars-flag="false"
                    />-->
                    <div class="pl-mavon-wrapper-collapse-button" @click="p_show=false">
                        <pl-icon icon="pl-arrow-up"/>
                    </div>
                </div>
            </pl-collapse>
        </div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";
    import PlCollapse from "../collapse/pl-collapse";

    export default {
        name: "pl-mavon",
        components: {PlCollapse, PlIcon},
        props: {
            markdown: {type: String},                                       //markdonw文件地址
            html: {type: String},                                           //Html代码
            js: {type: String},                                             //JavaScript代码
            scss: {type: String},                                            //Css代码
            show: {type: Boolean, default: false},                          //是否默认展开
            type: {type: String, default: 'html'},                          //代码类型
            title: {type: String, default: '查看代码'},                      //折叠标题
            initialized: {type: Boolean, default: false},                   //是否初始化的时候就初始化内容

            language: {type: String, default: 'zh-CN'},                     //
            fontSize: {type: String, default: '15px'},                      //
            scrollStyle: {type: Boolean, default: true},                    //
            boxShadow: {type: Boolean, default: false},                     //
            subfield: {type: Boolean, default: false},                      //
            defaultOpen: {type: String, default: 'preview'},                //
            placeholder: {type: String, default: '开始编辑...'},             //
            editable: {type: Boolean, default: true},                       //
            codeStyle: {type: String, default: 'code-github'},              //
            toolbarsFlag: {type: Boolean, default: false},                  //
            navigation: {type: Boolean, default: false},                    //
            ishljs: {type: Boolean, default: true},                         //
            imageFilter: {type: Function, default: null},                   //
            imageClick: {type: Function,},
            toolbars: {type: Object,},
        },
        data() {
            return {
                p_markdown: null,
                p_show: this.show,
                p_initialized: this.show || this.initialized,
            }
        },
        computed: {
            val() {
                let md = '';
                !!this.html && (md = md + '```html ' + this.html + '\n```\n')
                !!this.js && (md = md + '```javascript ' + this.js + '\n```\n')
                !!this.scss && (md = md + '```scss ' + this.scss + '\n```\n')
                !!this.p_markdown && (md += this.p_markdown)

                return md
            },
        },
        methods: {
            open() {
                const next = () => this.p_show = true
                if (!this.p_initialized) this.p_init(next)
                else next()
            },
            close() {
                this.p_show = false
            },
            p_init(next) {
                if (!!this.markdown) {
                    import('demo/components/' + this.markdown + '.md').then((val) => {
                        this.p_markdown = val.default
                        this.p_initialized = true
                        this.$nextTick(() => next())
                    })
                } else {
                    this.p_initialized = true
                    next()
                }
            },
        },
    }
</script>

<style lang="scss">
    .pl-mavon {
        .pl-mavon-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding: 0 32px;
            .pl-mavon-wrapper-collapse-button {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 32px;
                width: 100%;
                cursor: pointer;
                background-color: white;
            }
            .v-note-wrapper {
                min-height: initial;
                background-color: #f8f8f8;
                .v-note-panel {
                    border: initial;
                    .v-show-content {
                        padding: initial;
                        background: initial;
                        p, pre {
                            background: initial;
                            margin: initial;
                            padding: initial;
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>