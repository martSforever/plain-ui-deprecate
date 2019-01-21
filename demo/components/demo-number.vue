<template>
    <div class="demo-number">
        <demo-row title="基本用法">
            <link-number v-model="val1"/>
            <link-button>val1:{{val1}}</link-button>
        </demo-row>
        <demo-row title="加减大小间隔">
            <link-number :step="100"/>
        </demo-row>
        <demo-row title="最大最小值">
            <link-number :min="100" :max="500" v-model="val2"/>
            <link-button>val2:{{val2}}</link-button>
        </demo-row>
        <demo-row title="不显示加减控制器">
            <link-number no-controller/>
        </demo-row>

        <demo-row title="类型">
            <demo-row-item title="fill">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-type="fill"/>
            </demo-row-item>
            <demo-row-item title="line">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-type="line"/>
            </demo-row-item>
            <demo-row-item title="dashed">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-type="dashed"/>
            </demo-row-item>
            <demo-row-item title="none">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-type="none"/>
            </demo-row-item>
        </demo-row>

        <demo-row title="颜色">
            <demo-row-item title="line">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-type="line"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="形状">
            <demo-row-item title="none">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="none"/>
            </demo-row-item>
            <demo-row-item title="fillet">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="fillet"/>
            </demo-row-item>
            <demo-row-item title="round">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="round"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="大小">
            <demo-row-item title="large">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-size="large"/>
            </demo-row-item>
            <demo-row-item title="default">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-size="default"/>
            </demo-row-item>
            <demo-row-item title="small">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" box-size="small"/>
            </demo-row-item>
        </demo-row>

        <demo-row title="前置图标以及后置图标">
            <demo-row title="前置后置icon">
                <link-number v-for="(item,index) in colors" :box-color="item" :key="index" prefix-icon="pl-date" suffix-icon="pl-search"/>
            </demo-row>
        </demo-row>
        <demo-row title="加载图标">
            <link-number v-for="(item,index) in colors" :box-color="item" :key="index" loading/>
        </demo-row>

        <demo-row title="禁用样式">
            <link-number v-for="(item,index) in colors" :box-color="item" :key="index" disabled value="111" @click="log('click')" @clear="log('clear')"/>
        </demo-row>
        <demo-row title="只读">
            <link-number v-for="(item,index) in colors" :box-color="item" :key="index" readonly value="111" @click="log('click')" @clear="log('clear')"/>
        </demo-row>
        <demo-row title="去除默认padding">
            <link-number v-for="(item,index) in colors" :box-color="item" :key="index" :padding="false"/>
        </demo-row>
        <demo-row title="长输入框">
            <link-number long/>
        </demo-row>
        <demo-row title="设定宽度">
            <link-number :width="300"/>
        </demo-row>
        <demo-row title="校验">
            <link-number required ref="box"/>
        </demo-row>
        <demo-row title="输入框类型">
            <link-number type="password"/>
            <link-number type="number"/>
        </demo-row>
        <demo-row title="鼠标移动到上方的时候自动获取焦点">
            <link-number focus-on-hover/>
        </demo-row>
        <demo-row title="空值占位符">
            <link-number placeholder="输入xxx"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-number",
        data() {
            return {
                colors: ['primary', 'success', 'warn', 'error', 'info'],
                val1: null,
                val2: null,
            }
        },
    }
</script>

<style lang="scss">

</style>