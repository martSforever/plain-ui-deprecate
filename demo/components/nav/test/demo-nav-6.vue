<template>
    <div class="demo-nav-6">
        <demo-row>
            <h2>页面六</h2>
        </demo-row>
        <demo-row>
            <link-button box-type="line" :label="`页面六参数:${param.msg}`"/>
        </demo-row>
        <demo-row>
            <link-button @click="nav.back()" label="返回"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-6",
        props: {
            nav: {},
            param: {},
        },
    }
</script>

<style lang="scss">

</style>