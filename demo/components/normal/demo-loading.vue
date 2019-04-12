<template>
    <div class="demo-loading">
        <demo-row title="基本用法">
            <link-loading/>
        </demo-row>
        <demo-row title="基本用法">
            <link-loading type="default"/>
            <link-loading type="section-one"/>
            <link-loading type="section-two"/>
            <link-loading type="section-three"/>
            <link-loading type="section-part"/>
            <link-loading type="section-dot"/>
        </demo-row>
        <demo-row title="大小">
            <link-loading style="font-size: 3em"/>
        </demo-row>
        <demo-row title="颜色">
            <div v-for="item in ['primary','success','warn','error','info','black','white']" :key="item" style="display: inline-block;padding: 12px;"
                 :style="{backgroundColor:item==='white'?'black':'unset'}">
                <link-loading type="default" :color="item"/>
                <link-loading type="section-one" :color="item"/>
                <link-loading type="section-two" :color="item"/>
                <link-loading type="section-three" :color="item"/>
                <link-loading type="section-part" :color="item"/>
                <link-loading type="section-dot" :color="item"/>
            </div>
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