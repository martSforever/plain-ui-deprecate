<template>
    <div class="demo-rate">
        <demo-row title="基本用法">
            <link-rate/>
        </demo-row>
        <demo-row :title="'设置总分为10分：'+val1">
            <link-rate v-model="val1" :total="10"/>
        </demo-row>
        <demo-row :title="'设置星星显示个数'+val1">
            <link-rate :count="10" :total="10" v-model="val1"/>
        </demo-row>
        <demo-row title="模式">
            <demo-row-item title="普通模式">
                <link-rate mode="normal" :value="2.4"/>
            </demo-row-item>
            <demo-row-item title="半星模式">
                <link-rate mode="half" :value="2.5"/>
            </demo-row-item>
            <demo-row-item title="整星模式">
                <link-rate mode="all" :value="2"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="颜色">
            <link-rate v-for="(color,index) in ['primary','success','error','warn','info']" :key="index" :color="color"/>
        </demo-row>
        <demo-row title="设置激活icon与未激活icon">
            <link-rate active-icon="pl-like-fill" inactive-icon="pl-like" color="error" :value="3"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-rate",
        data() {
            return {
                val1: 2.5,
            }
        },
    }
</script>

<style lang="scss">

</style>