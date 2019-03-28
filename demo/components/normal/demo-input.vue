<template>
    <div class="demo-input">
        <demo-row title="基本用法">
            <link-input v-model="val0"/>
            <link-button>val0:{{val0}}</link-button>
        </demo-row>
        <demo-row title="类型">
            <demo-row-item title="fill">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-type="fill"/>
            </demo-row-item>
            <demo-row-item title="line">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-type="line"/>
            </demo-row-item>
            <demo-row-item title="dashed">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-type="dashed"/>
            </demo-row-item>
            <demo-row-item title="none">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-type="none"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="颜色">
            <demo-row-item title="line">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-type="line"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="形状">
            <demo-row-item title="none">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="none"/>
            </demo-row-item>
            <demo-row-item title="fillet">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="fillet"/>
            </demo-row-item>
            <demo-row-item title="round">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-shape="round"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="大小">
            <demo-row-item title="large">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-size="large"/>
            </demo-row-item>
            <demo-row-item title="default">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-size="default"/>
            </demo-row-item>
            <demo-row-item title="small">
                <link-input v-for="(item,index) in colors" :box-color="item" :key="index" box-size="small"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="前置图标以及后置图标">
            <link-input v-for="(item,index) in colors" :box-color="item" :key="index" prefix-icon="pl-date-fill" suffix-icon="pad-search"/>
        </demo-row>
        <demo-row title="加载图标">
            <link-input v-for="(item,index) in colors" :box-color="item" :key="index" loading/>
        </demo-row>

        <demo-row title="禁用样式">
            <link-input v-for="(item,index) in colors" :box-color="item" :key="index" disabled value="111" @click="_click('click')" @clear="_click('clear')"/>
        </demo-row>
        <demo-row title="只读">
            <link-input v-for="(item,index) in colors" :box-color="item" :key="index" readonly value="111" @click="_click('click')" @clear="_click('clear')"/>
        </demo-row>
        <demo-row title="去除默认padding">
            <link-input v-for="(item,index) in colors" :box-color="item" :key="index" :padding="false"/>
        </demo-row>
        <demo-row title="长输入框">
            <link-input long/>
        </demo-row>
        <demo-row title="设定宽度">
            <link-input :width="300"/>
        </demo-row>
        <demo-row title="校验">
            <link-input required ref="box"/>
        </demo-row>
        <demo-row title="输入框类型">
            <link-input type="password"/>
            <link-input type="number"/>
        </demo-row>
        <demo-row title="使用replaceRegexp替换掉不可输入的字符，比如/[^0-9.]/g限制只能输入数字以及小数点">
            <link-input :replace-regexp="/[^0-9.]/g" v-model="val1"/>
            <link-button>val1:{{val1}}</link-button>
        </demo-row>
        <demo-row title="鼠标移动到上方的时候自动获取焦点">
            <link-input focus-on-hover/>
        </demo-row>
        <demo-row title="取消默认清除事件，点击清除按钮之后不再自动删除内容只是派发事件">
            <link-input :default-clear="false" @clear="log('clear...')"/>
        </demo-row>
        <demo-row title="空值占位符">
            <link-input placeholder="输入xxx"/>
        </demo-row>
        <demo-row title="前置插槽以及后置插槽">
            <link-input :width="null">
                <div slot="prepend" class="pl-input-prepend">前置内容</div>
                <div slot="append" class="pl-input-append">后置内容</div>
            </link-input>
            <link-input :width="null" placeholder="baidu" :clear-icon="null" :default-clear="false">
                <div slot="prepend" class="pl-input-prepend">https://www.</div>
                <div slot="append" class="pl-input-append">.com</div>
            </link-input>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-input",
        data() {
            return {
                val0: null,
                val1: null,
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

</style>