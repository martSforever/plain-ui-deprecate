<template>
    <div class="demo-loading">
        <demo-row title="基本用法">
            <link-loading/>
        </demo-row>
        <demo-row title="基本用法">
            <link-loading type="section-one"/>
            <link-loading type="section-two"/>
            <link-loading type="section-three"/>
            <link-loading type="section-part"/>
            <link-loading type="section-dot"/>
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