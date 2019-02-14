<template>
    <div class="demo-page-bar">
        <demo-row title="基本用法">
            <link-page-bar :page="1" :size="20" :total="188"/>
        </demo-row>
        <demo-row title="自定义页大小选项">
            <link-page-bar :page="1" :size="15" :total="188" :size-data="[15,20,30,40,50,60,70]"/>
        </demo-row>
        <demo-row title="自定义页过多时显示的页数availablePage=1">
            <link-page-bar :page="1" :size="20" :total="188" :availablePage="1"/>
        </demo-row>
        <demo-row title="显示加载状态">
            <link-page-bar :page="1" :size="20" :total="188" loading/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-page-bar"
    }
</script>

<style lang="scss">

</style>