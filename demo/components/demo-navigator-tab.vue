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
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-tab"
    }
</script>

<style lang="scss">

</style>