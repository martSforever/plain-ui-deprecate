<template>
    <div class="demo-toggle">
        <demo-row title="基本用法">
            <link-toggle v-model="val1"/>
        </demo-row>
        <demo-row title="颜色">
            <link-toggle v-for="(item,index) in colors" :color="item" :key="index" :value="true"/>
        </demo-row>
        <demo-row title="大小尺寸">
            <demo-row-item title="large">
                <link-toggle v-for="(item,index) in colors" :color="item" :key="index" :value="true" size="large"/>
            </demo-row-item>
            <demo-row-item title="default">
                <link-toggle v-for="(item,index) in colors" :color="item" :key="index" :value="true" size="default"/>
            </demo-row-item>
            <demo-row-item title="small">
                <link-toggle v-for="(item,index) in colors" :color="item" :key="index" :value="true" size="small"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="禁用与只读">
            <demo-row-item title="禁用">
                <link-toggle v-model="val1" disabled/>
            </demo-row-item>
            <demo-row-item title="只读">
                <link-toggle v-model="val1" readonly/>
            </demo-row-item>
        </demo-row>
        <demo-row title="设置真假值">
            <link-toggle v-model="val2" true-value="Y" false-value="N"/>
            <link-button>val2:{{val2}}</link-button>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-toggle",
        data() {
            return {
                val1: true,
                colors: ['primary', 'success', 'warn', 'error', 'info'],
                val2: 'Y',
            }
        },
    }
</script>

<style lang="scss">

</style>