<template>
    <div :class="[theme]">
        <div class="demo-test2">
            <demo-test-ss/>
            <link-button label="复制内容到剪切板" @click="click"/>
            <div>
                <link-button v-for="(item,index) in ['primary','success','warn','error','disabled']"
                             :key="index"
                             :box-color="item"
                             :label="item"/>
            </div>
            <div>
                <link-button-group>
                    <link-button v-for="(item,index) in themes"
                                 :key="index"
                                 :label="item"
                                 @click="changeTheme(item)"/>
                </link-button-group>
            </div>
            <div class="hello">
                hello
            </div>
        </div>
    </div>
</template>

<script>
    import DemoTestSs from "../demo-test-ss";

    export default {
        name: "demo-test2",
        components: {DemoTestSs},
        data() {
            return {
                theme: null,
                themes: ['default', 'black', 'custom']
            }
        },
        methods: {
            click() {
                this.$plain.$utils.copyToClipboard("hello world",
                    () => this.$message.show("复制成功！"),
                    () => this.$message.show("复制失败！"))
            },
            changeTheme(item) {
                this.$plain.changeTheme(item)
            },
        }
    }
</script>

<style lang="scss">

    @include themeify {
        .demo-test2 {
            .hello {
                border-radius: 6px;
                padding: 6px 12px;
                background-color: pl-var(color-primary);
            }
        }
    }
</style>