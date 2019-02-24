<template>
    <div class="demo-scroll-option">
        <div class="demo-scroll-option-box">
            <demo-row>
                scrollTop:{{scrollTop}}
            </demo-row>
            <link-scroll-option :data="data" labelKey="name" valueKey="value" @scroll="val=>scrollTop = val"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-scroll-option",
        data() {
            return {
                scrollTop: 0,
                data: [
                    {name: '张三', value: 'zhangsan'},
                    {name: '李四', value: 'lisi'},
                    {name: '王五', value: 'wangwu'},
                    {name: '张三', value: 'zhangsan'},
                    {name: '李四', value: 'lisi'},
                    {name: '王五', value: 'wangwu'},
                    {name: '张三', value: 'zhangsan'},
                    {name: '李四', value: 'lisi'},
                    {name: '王五', value: 'wangwu'},
                    {name: '张三', value: 'zhangsan'},
                    {name: '李四', value: 'lisi'},
                    {name: '王五', value: 'wangwu'},
                ],
            }
        },
    }
</script>

<style lang="scss">
    .demo-scroll-option {
        .demo-scroll-option-box {
            width: 100px;
        }
    }
</style>