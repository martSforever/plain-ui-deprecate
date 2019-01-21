<template>
    <div class="demo-button">
        <link-mavon
                type="javascript"
                title="javascript代码"
                code='
             export default {
                name: "demo-button",
                data() {
                    return {
                        current: null,
                        colors: ["primary", "success", "warn", "error", "info"]
                    }
                },
                methods: {
                    _click() {
                        console.log("click");
                    },
                }
            }
        '>
            <demo-row>
                <link-button label="基本用法"/>
            </demo-row>
        </link-mavon>

        <link-mavon code='
            <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index"/>
       '>
            <demo-row title="颜色">
                <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index"/>
            </demo-row>
        </link-mavon>

        <link-mavon code='
                <link-button v-for="(item,index) in colors" :label="item" :box-color="item" loading :key="index"/>
        '>
            <demo-row title="加载按钮">
                <link-button v-for="(item,index) in colors" :label="item" :box-color="item" loading :key="index"/>
            </demo-row>
        </link-mavon>

        <link-mavon code='
            <link-button v-for="(item,index) in colors" :label="item" :key="index" prefix-icon="lv-date" suffix-icon="lv-search"/>
        '>
            <demo-row title="左右图标">
                <link-button v-for="(item,index) in colors" :label="item" :key="index" prefix-icon="lv-date" suffix-icon="lv-search"/>
            </demo-row>
        </link-mavon>

        <link-mavon code='
            <link-button v-for="(item,index) in colors" :key="index" :box-color="item" icon-only suffix-icon="lv-search" @click="_click"/>
        '>
            <demo-row title="只有图标">
                <link-button v-for="(item,index) in colors" :key="index" :box-color="item" icon-only suffix-icon="lv-search" @click="_click"/>
            </demo-row>
        </link-mavon>

        <link-mavon code='
           <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" disabled @click="_click"/>
           <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index+10" disabled box-type="line" @click="_click"/>
           <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index+20" disabled box-type="none" @click="_click"/>
        '>
            <demo-row title="禁用">
                <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" disabled @click="_click"/>
                <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index+10" disabled box-type="line" @click="_click"/>
                <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index+20" disabled box-type="none" @click="_click"/>
            </demo-row>
        </link-mavon>

        <link-mavon code='
            <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" readonly box-type="fill" @click="_click"/>
        '>
            <demo-row title="只读">
                <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" readonly box-type="fill" @click="_click"/>
            </demo-row>
        </link-mavon>

        <link-mavon code='
                <demo-row-item title="small">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-size="small"/>
                </demo-row-item>
                <demo-row-item title="default">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-size="default"/>
                </demo-row-item>
                <demo-row-item title="large">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-size="large"/>
                </demo-row-item>
        '>
            <demo-row title="大小">
                <demo-row-item title="small">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-size="small"/>
                </demo-row-item>
                <demo-row-item title="default">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-size="default"/>
                </demo-row-item>
                <demo-row-item title="large">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-size="large"/>
                </demo-row-item>
            </demo-row>
        </link-mavon>

        <link-mavon code='
                <demo-row-item title="none">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-shape="none"/>
                </demo-row-item>
                <demo-row-item title="fillet">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-shape="fillet"/>
                </demo-row-item>
                <demo-row-item title="round">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-shape="round"/>
                </demo-row-item>
        '>
            <demo-row title="形状">
                <demo-row-item title="none">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-shape="none"/>
                </demo-row-item>
                <demo-row-item title="fillet">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-shape="fillet"/>
                </demo-row-item>
                <demo-row-item title="round">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-shape="round"/>
                </demo-row-item>
            </demo-row>
        </link-mavon>


        <link-mavon code='
                <demo-row-item title="fill">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill"/>
                </demo-row-item>
                <demo-row-item title="line">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="line"/>
                </demo-row-item>
                <demo-row-item title="none">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="none"/>
                </demo-row-item>
                <demo-row-item title="dashed">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="dashed"/>
                </demo-row-item>
        '>
            <demo-row title="样式">
                <demo-row-item title="fill">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill"/>
                </demo-row-item>
                <demo-row-item title="line">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="line"/>
                </demo-row-item>
                <demo-row-item title="none">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="none"/>
                </demo-row-item>
                <demo-row-item title="dashed">
                    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="dashed"/>
                </demo-row-item>
            </demo-row>
        </link-mavon>

        <link-mavon code='
                <demo-row-item title="fill">
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill"/>
                    </link-button-group>
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="fill"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="line">
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="line"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="dashed">
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="dashed"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="fill">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill" :active="item === current" @click="current = item"/>
                    </link-button-group>
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="fill" :active="item === current"
                                     @click="current = item"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="line">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="line"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="dashed">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="dashed"/>
                    </link-button-group>
                </demo-row-item>
       '>
            <demo-row title="按钮组">
                <demo-row-item title="fill">
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill"/>
                    </link-button-group>
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="fill"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="line">
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="line"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="dashed">
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="dashed"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="fill">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill" :active="item === current" @click="current = item"/>
                    </link-button-group>
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="fill" :active="item === current"
                                     @click="current = item"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="line">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="line"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="dashed">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="dashed"/>
                    </link-button-group>
                </demo-row-item>
            </demo-row>
        </link-mavon>

        <link-mavon code='
            <demo-row-item title="fill">
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill" :active="item === current" @click="current = item"/>
                    </link-button-group>
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="fill" :active="item === current"
                                     @click="current = item"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="line">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="line" :active="item === current"
                                     @click="current = item"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="dashed">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="dashed" :active="item === current"
                                     @click="current = item"/>
                    </link-button-group>
                </demo-row-item>
        '>
            <demo-row title="按钮的激活状态">
                <demo-row-item title="fill">
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill" :active="item === current" @click="current = item"/>
                    </link-button-group>
                    <link-button-group>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="fill" :active="item === current"
                                     @click="current = item"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="line">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="line" :active="item === current"
                                     @click="current = item"/>
                    </link-button-group>
                </demo-row-item>
                <demo-row-item title="dashed">
                    <link-button-group vertical>
                        <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="dashed" :active="item === current"
                                     @click="current = item"/>
                    </link-button-group>
                </demo-row-item>
            </demo-row>
        </link-mavon>

        <link-doc :lv-props="lvProps" :lv-events="lvEvents" :lv-slots="lvSlots"/>
    </div>
</template>

<script>
    export default {
        name: "demo-button",
        data() {
            return {
                current: null,
                colors: ["primary", "success", "warn", "error", "info"],
                lvProps: [
                    {name: 'label', type: 'String', select: null, default: null, desc: '按钮文本'},
                    {name: 'active', type: 'Boolean', select: null, default: 'false', desc: '按钮是否处于激活状态'},

                    {name: 'boxType', type: 'String', select: 'fill|line|none|dashed', default: 'fill', desc: '盒子类型'},
                    {name: 'boxColor', type: 'String', select: 'primary|success|warn|error|info', default: 'primary', desc: '盒子颜色'},
                    {name: 'boxShape', type: 'String', select: 'fillet|round|none', default: 'none', desc: '盒子形状'},
                    {name: 'boxSize', type: 'String', select: 'large|default|small', default: 'default', desc: '盒子大小'},
                    {name: 'prefixIcon', type: 'String', select: null, default: null, desc: '前置图标'},
                    {name: 'suffixIcon', type: 'String', select: null, default: null, desc: '后置图标'},
                    {name: 'clearIcon', type: 'String', select: null, default: null, desc: '清除图标，当该属性存在时，hover自动为true，当value有值并且hovering时，显示lv-close，否则显示clearIcon'},
                    {name: 'loading', type: 'Boolean', select: null, default: null, desc: '显示按钮loading图标'},
                    {name: 'iconOnly', type: 'Boolean', select: null, default: null, desc: '只有图标，设置为true则盒子宽高相等，并且为圆形'},
                    {name: 'readonly', type: 'Boolean', select: null, default: null, desc: '只读'},
                    {name: 'disabled', type: 'Boolean', select: null, default: null, desc: '禁用（颜色变为disabled）'},
                    {name: 'padding', type: 'Boolean', select: null, default: null, desc: '是否带左右边距'},
                    {name: 'long', type: 'Boolean', select: null, default: null, desc: '长按钮'},
                    {name: 'width', type: 'String|Number', select: null, default: '256', desc: '盒子宽度'},
                ],
                lvEvents: [
                    {name: 'click', desc: '用户点击派发事件', param: null},
                ],
                lvSlots: [
                    {name: 'default', desc: '自定义内容插槽', param: null},
                ]
            }
        },
        methods: {
            _click() {
                console.log("click");
            },
        }
    }
</script>

<style lang="scss">
    .demo-button {
        padding-top: 16px;
    }
</style>