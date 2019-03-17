<template>
    <div class="pl-markdown-parser-item">
        <component
                v-if="data.isBlock"
                :is="`pl-markdown-parser-item-${data.setting.type || 'demo'}`"
                :data="data"
                :leftWidth="leftWidth"
                :screenHeight="screenHeight"
        />
        <pl-markdown v-else :value="data.md"/>
    </div>
</template>

<script>

    import PlMarkdownParserItemDemo from "./pl-markdown-parser-item-demo";
    import PlMarkdown from "./pl-markdown";

    export default {
        name: "pl-markdown-parser-item",
        components: {PlMarkdown, PlMarkdownParserItemDemo},
        props: {
            data: {},                                                   //当前示例的数据
            index: {},                                                  //索引
            leftWidth: {},                                              //示例左侧宽度
            screenHeight: {},                                           //网页宽度
        },
    }
</script>

<style lang="scss">
    .pl-markdown-parser-item {
        margin-bottom: 40px;
    }
</style>