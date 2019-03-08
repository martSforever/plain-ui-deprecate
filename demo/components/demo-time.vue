<template>
    <div class="demo-time">
        <demo-row :title="`基本用法：${val[0]}`">
            <!--<pl-time-panel v-model="val[0]"/>-->
            <link-time v-model="val[0]"/>
        </demo-row>
        <demo-row title="测试双向绑定">
            <link-time v-model="val[1]"/>
            <link-time v-model="val[1]"/>
        </demo-row>
        <demo-row title="最大最小值,max=12:12:12,min=05:05:05">
            <link-time v-model="val[0]" max="12:12:12" min="05:05:05"/>
        </demo-row>
        <demo-row title="自定义内容">
            <link-time v-model="val[2]">
                <template slot-scope="{value}">
                    <span>{{value}}</span>
                </template>
            </link-time>
        </demo-row>
    </div>
</template>

<script>
    import PlTimePanel from "../../src/components/time/pl-time-panel";

    export default {
        name: "demo-time",
        components: {PlTimePanel},
        data() {
            return {
                val: {
                    1: '12:08:09',
                    2: '12:30:00',
                },
            }
        },
    }
</script>

<style lang="scss">

</style>