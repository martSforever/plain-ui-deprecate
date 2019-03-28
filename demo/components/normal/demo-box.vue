<template>
    <div class="demo-box">
        <demo-row title="颜色">
            <link-box v-for="(item,index) in colors" :box-color="item" :key="index">{{item}}</link-box>
        </demo-row>
        <demo-row title="类型">
            <demo-row-item title="fill">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-type="fill">{{item}}</link-box>
            </demo-row-item>
            <demo-row-item title="line">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-type="line">{{item}}</link-box>
            </demo-row-item>
            <demo-row-item title="none">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-type="none">{{item}}</link-box>
            </demo-row-item>
            <demo-row-item title="dashed">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-type="dashed">{{item}}</link-box>
            </demo-row-item>
        </demo-row>
        <demo-row title="大小">
            <demo-row-item title="small">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-size="small">{{item}}</link-box>
            </demo-row-item>
            <demo-row-item title="default">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-size="default">{{item}}</link-box>
            </demo-row-item>
            <demo-row-item title="large">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-size="large">{{item}}</link-box>
            </demo-row-item>
        </demo-row>
        <demo-row title="圆角">
            <demo-row-item title="large">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="fillet">{{item}}</link-box>
            </demo-row-item>
            <demo-row-item title="round">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="round">{{item}}</link-box>
            </demo-row-item>
            <demo-row-item title="none">
                <link-box v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="none">{{item}}</link-box>
            </demo-row-item>
        </demo-row>

        <demo-row title="前置后置icon">
            <link-box v-for="(item,index) in colors" :box-color="item" :key="index" prefix-icon="pl-date-fill" suffix-icon="pad-search">{{item}}</link-box>
        </demo-row>
        <demo-row title="清除icon">
            <link-box v-for="(item,index) in colors" :box-color="item" :key="index" clear-icon="pl-date-fill" value="111" @click="_click('click')" @clear="_click('clear')">{{item}}</link-box>
        </demo-row>
        <demo-row title="加载图标">
            <link-box v-for="(item,index) in colors" :box-color="item" :key="index" loading>{{item}}</link-box>
        </demo-row>
        <demo-row title="只有icon">
            <link-box v-for="(item,index) in colors" :box-color="item" :key="index" icon-only suffix-icon="pad-search">{{item}}</link-box>
        </demo-row>

        <demo-row title="禁用样式">
            <link-box v-for="(item,index) in colors" :box-color="item" :key="index" disabled clear-icon="pl-date-fill" value="111" @click="_click('click')" @clear="_click('clear')">{{item}}</link-box>
        </demo-row>
        <demo-row title="只读">
            <link-box v-for="(item,index) in colors" :box-color="item" :key="index" readonly clear-icon="pl-date-fill" value="111" @click="_click('click')" @clear="_click('clear')">{{item}}</link-box>
        </demo-row>
        <demo-row title="去除默认padding">
            <link-box v-for="(item,index) in colors" :box-color="item" :key="index" :padding="false" suffix-icon="pad-search">{{item}}</link-box>
        </demo-row>
        <demo-row title="长按钮">
            <link-box long>long box</link-box>
        </demo-row>
        <demo-row title="设定宽度">
            <link-box :width="300">long box</link-box>
        </demo-row>
        <demo-row title="监听鼠标hover">
            <link-box hover @enter="_click('enter')" @leave="_click('leave')">hover</link-box>
        </demo-row>
        <demo-row title="校验">
            <link-box required ref="box">valid</link-box>
            <link-button label="valid" @click="$refs.box.validate()"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-box",
        data() {
            return {
                colors: ['primary', 'success', 'warn', 'error', 'info']
            }
        },
        methods: {
            _click(msg) {
                console.log(msg);
            },
        }
    }
</script>

<style lang="scss">
    .demo-box {
        .pl-box {
            margin-right: 12px;
        }
    }
</style>