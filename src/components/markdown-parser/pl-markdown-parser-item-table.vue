<template>
    <div class="pl-markdown-parser-item-table">
        <pl-markdown :value="data.md"/>
    </div>
</template>

<script>
    import PlMarkdown from "./pl-markdown";

    export default {
        name: "pl-markdown-parser-item-table",
        components: {PlMarkdown},
        props: {
            data: {},
        },
    }
</script>

<style lang="scss">
    .pl-markdown-parser-item-table {
        .pl-markdown {
            width: 100%;
            table {
                width: 100%;
                border-spacing: 0;
                border-collapse: collapse;
                td, th {
                    font-size: 12px;
                    border: solid 1px #ddd;
                }
                thead {
                    background-color: #f2f2f2;
                    th {
                        height: 32px;
                        padding: 0 12px;
                    }
                }
                tbody {
                    td {
                        height: 40px;
                        padding: 0 12px;
                        border-bottom: solid 1px #f2f2f2;
                    }
                }

            }
        }
    }
</style>