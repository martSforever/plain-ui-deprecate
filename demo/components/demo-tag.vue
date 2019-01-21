<template>
    <div class="demo-tag">
        <demo-row title="颜色">
            <link-tag v-for="(item,index) in colors" :box-color="item" :key="index">标签</link-tag>
        </demo-row>

        <demo-row title="类型">
            <demo-row-item title="fill">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-type="fill">标签</link-tag>
            </demo-row-item>
            <demo-row-item title="line">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-type="line">标签</link-tag>
            </demo-row-item>
            <demo-row-item title="none">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-type="none">标签</link-tag>
            </demo-row-item>
            <demo-row-item title="dashed">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-type="dashed">标签</link-tag>
            </demo-row-item>
        </demo-row>
        
        <demo-row title="大小">
            <demo-row-item title="small">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-size="small">标签</link-tag>
            </demo-row-item>
            <demo-row-item title="default">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-size="default">标签</link-tag>
            </demo-row-item>
            <demo-row-item title="large">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-size="large">标签</link-tag>
            </demo-row-item>
        </demo-row>

        <demo-row title="形状">
            <demo-row-item title="fillet">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="fillet">标签</link-tag>
            </demo-row-item>
            <demo-row-item title="round">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="round">标签</link-tag>
            </demo-row-item>
            <demo-row-item title="none">
                <link-tag v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="none">标签</link-tag>
            </demo-row-item>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-tag",
        data() {
            return {
                colors: ['primary', 'success', 'warn', 'error', 'info']
            }
        },
    }
</script>

<style lang="scss">

</style>