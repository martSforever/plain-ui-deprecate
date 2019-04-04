<template>
    <div class="demo-test2">
        <demo-test-ss/>
        <link-button label="复制内容到剪切板" @click="click"/>
    </div>
</template>

<script>
    import DemoTestSs from "../demo-test-ss";

    export default {
        name: "demo-test2",
        components: {DemoTestSs},
        methods: {
            click() {
                this.$plain.$utils.copyToClipBoard("hello world",
                    () => this.$message.show("复制成功！"),
                    () => this.$message.show("复制失败！"))
            },
        }
    }
</script>

<style lang="scss">

</style>