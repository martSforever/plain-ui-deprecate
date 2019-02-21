<template>
    <div class="demo-navigator-tab">
        <demo-row>
            <demo-row-item title="操作按钮">
                <link-button label="打开【Color推荐】" @click="$refs.tabs1.push('/demo-color','Color推荐')"/>
                <link-button label="打开【Icon图标设置】" @click="$refs.tabs1.push('/demo-icon','Icon图标设置')"/>
                <link-button label="打开【Radio单选复选】" @click="$refs.tabs1.push('/demo-radio','Radio单选复选')"/>
            </demo-row-item>
            <link-navigator-tab height="300px" ref="tabs1"/>
        </demo-row>
        <demo-row title="初始化的时候就显示可以打开的页面">
            <link-navigator-tab height="300px"
                                :init-pages="[
                                {title:'Color推荐',path:'/demo-color'},
                                {title:'Icon图标设置',path:'/demo-icon'},
                                {title:'Radio单选复选',path:'/demo-radio'},
                            ]"/>
        </demo-row>

        <demo-row title="同一個页面是否可以打开多次">
            <demo-row-item title="操作按钮">
                <link-button label="打开【Color推荐】" @click="$refs.tabs2.push('/demo-color','Color推荐')"/>
                <link-button label="打开【Icon图标设置】" @click="$refs.tabs2.push('/demo-icon','Icon图标设置')"/>
                <link-button label="打开【Radio单选复选】" @click="$refs.tabs2.push('/demo-radio','Radio单选复选',count++)"/>
                <link-button label="打开【Test测试页面】" @click="$refs.tabs2.push('/demo-test-page','Test测试页面',count++)"/>
            </demo-row-item>
            <link-navigator-tab height="300px" ref="tabs2" multiple/>
        </demo-row>

        <demo-row title="设置id，缓存页面，刷新之后打开原来正在查看的页面">
            <demo-row-item title="操作按钮">
                <link-button label="打开【Color推荐】" @click="$refs.tabs3.push('/demo-color','Color推荐')"/>
                <link-button label="打开【Icon图标设置】" @click="$refs.tabs3.push('/demo-icon','Icon图标设置')"/>
                <link-button label="打开【Radio单选复选】" @click="$refs.tabs3.push('/demo-radio','Radio单选复选')"/>
            </demo-row-item>
            <link-navigator-tab height="300px" ref="tabs3" id="1545826196135"/>
        </demo-row>

        <demo-row title="双向绑定控制页面切换">
            <demo-row-item title="操作按钮">
                <link-button-group>
                    <link-button label="打开【Color推荐】" @click="$refs.tabs4.push('/demo-color','Color推荐')"/>
                    <link-button label="打开【Icon图标设置】" @click="$refs.tabs4.push('/demo-icon','Icon图标设置')"/>
                    <link-button label="打开【Radio单选复选】" @click="$refs.tabs4.push('/demo-radio','Radio单选复选')"/>
                </link-button-group>
                <link-button-group>
                    <link-button label="前一页" @click="index--"/>
                    <link-button label="后一页" @click="index++"/>
                    <link-button :label="`index:${index}`"/>
                </link-button-group>
            </demo-row-item>
            <link-navigator-tab height="300px" ref="tabs4" v-model="index"/>
        </demo-row>

    </div>
</template>

<script>
    export default {
        name: "demo-navigator-tab",
        data() {
            return {
                count: 1,
                index: 0,
            }
        },
    }
</script>

<style lang="scss">

</style>