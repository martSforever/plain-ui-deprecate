<template>
    <div class="demo-mavon">
        <link-mavon
                html='
        <link-button label="按钮11"/>
        <link-button label="按钮22"/>
        <link-button label="按钮33"/>
'
                js='
    export default {
        name: "demo-mavon",
        data() {
            return {
                code1: ` \`\`\`  <link-button label="按钮"/> \`\`\` `,

                lvProps: [
                    {name: "data", type: "String", select: null, default: null, desc: "显示的数据"}
                ],
                lvEvents: [
                    {name: "click", desc: "用户点击派发事件", param: "selectRow"},
                ],
                lvMethods: [
                    {name: "close", desc: "关闭弹框", param: "animate"},
                ],
                lvSlots: [
                    {name: "close", desc: "关闭弹框", param: "animate"},
                ]
            }
        },
    }
'
                scss='
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
'
        >
            <demo-row title="基本用法">
                <link-button label="按钮"/>
            </demo-row>
        </link-mavon>

        <link-doc :pl-props="lvProps" :pl-events="lvEvents" :pl-methods="lvMethods" :pl-slots="lvSlots"/>
    </div>
</template>

<script>
    export default {
        name: "demo-mavon",
        data() {
            return {
                code1: ` \`\`\`  <link-button label="按钮"/> \`\`\` `,

                lvProps: [
                    {name: "data", type: "String", select: null, default: null, desc: "显示的数据"}
                ],
                lvEvents: [
                    {name: "click", desc: "用户点击派发事件", param: "selectRow"},
                ],
                lvMethods: [
                    {name: "close", desc: "关闭弹框", param: "animate"},
                ],
                lvSlots: [
                    {name: "close", desc: "关闭弹框", param: "animate"},
                ]
            }
        },
    }
</script>

<style lang="scss">

</style>