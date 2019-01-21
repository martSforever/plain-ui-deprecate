<template>
    <div class="demo-loading">
        <demo-row title="基本用法">
            <link-loading/>
        </demo-row>
        <demo-row title="基本用法">
            <link-loading type="dual"/>
            <link-loading type="eclipse"/>
            <link-loading type="ripple"/>
            <link-loading type="rolling"/>
            <link-loading type="spin"/>
            <link-loading type="spin2"/>
            <link-loading type="spinner1"/>
            <link-loading type="spinner2"/>
            <link-loading type="spinner3"/>
        </demo-row>
        <demo-row title="大小">
            <link-loading size="56px"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-loading"
    }
</script>

<style lang="scss">

</style>