<template>
    <div class="demo-tabs">
        <demo-row title="基本用法">
            <link-tabs height="200px">
                <link-tab title="用户管理1">
                    demo-tabs 1111
                </link-tab>
                <link-tab title="用户管理2">
                    demo-tabs 2222
                </link-tab>
            </link-tabs>
        </demo-row>
        <demo-row title="初始化的时候就初始化所有子页签，否则默认为懒初始化，第一次显示的时候才会初始化">
            <link-tabs height="200px">
                <link-tab title="懒初始化：用户管理1">
                    demo-tabs 1111
                    <demo-child title="-懒初始化：子组件1-"/>
                </link-tab>
                <link-tab title="懒初始化：用户管理2">
                    demo-tabs 2222
                    <demo-child title="-懒初始化：子组件2-"/>
                </link-tab>
                <link-tab title="懒初始化：用户管理3">
                    demo-tabs 3333
                    <demo-child title="-懒初始化：子组件3-"/>
                </link-tab>
            </link-tabs>
            <link-tabs initialized height="200px">
                <link-tab title="全初始化：用户管理4">
                    demo-tabs 444
                    <demo-child title="-全初始化：子组件4-"/>
                </link-tab>
                <link-tab title="全初始化：用户管理5">
                    demo-tabs 555
                    <demo-child title="-全初始化：子组件5-"/>
                </link-tab>
                <link-tab title="全初始化：用户管理6">
                    demo-tabs 666
                    <demo-child title="-全初始化：子组件6-"/>
                </link-tab>
            </link-tabs>
        </demo-row>

        <demo-row title="双向绑定移动页面">
            <demo-row>
                <link-button label="后退" @click="index = index-1<0?0:index-1"/>
                <link-button label="前进" @click="index = index+1>2?2:index+1"/>
            </demo-row>
            <link-tabs v-model="index" height="200px">
                <link-tab title="用户管理1">
                    demo-tabs 1111
                </link-tab>
                <link-tab title="用户管理2">
                    demo-tabs 2222
                </link-tab>
                <link-tab title="用户管理3">
                    demo-tabs 3333
                </link-tab>
            </link-tabs>
        </demo-row>

        <demo-row title="特殊页面立即初始化">
            <link-tabs height="200px">
                <link-tab title="用户管理1">
                    demo-tabs 1111
                </link-tab>
                <link-tab title="用户管理2">
                    demo-tabs 2222
                </link-tab>
                <link-tab title="该页立即初始化" initialized>
                    demo-tabs 333
                    <demo-child title="立即初始化"/>
                </link-tab>
            </link-tabs>
        </demo-row>

        <demo-row title="特殊页面隐藏时销毁内容">
            <link-tabs height="200px">
                <link-tab title="用户管理1">
                    demo-tabs 1111
                </link-tab>
                <link-tab title="用户管理2">
                    demo-tabs 2222
                </link-tab>
                <link-tab title="该页面隐藏时销毁" destroyed-on-hide>
                    demo-tabs 333
                    <demo-child title="隐藏时销毁"/>
                </link-tab>
            </link-tabs>
        </demo-row>

    </div>
</template>

<script>
    export default {
        name: "demo-tabs",
        data() {
            return {
                index: 0,
            }
        },
    }
</script>

<style lang="scss">

</style>