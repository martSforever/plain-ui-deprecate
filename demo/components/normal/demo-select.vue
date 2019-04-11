<template>
    <div class="demo-select">
        <demo-row title="基本用法">
            <link-select v-model="val1" :data="list" value-key="val" label-key="name"/>
            <link-button>val1:{{val1}}</link-button>
        </demo-row>
        <demo-row title="单选与多选">
            <demo-row-item title="单选">
                <link-select v-model="val1" :data="list" value-key="val" label-key="name"/>
                <link-button>val1:{{val1}}</link-button>
            </demo-row-item>
            <demo-row-item title="多选">
                <link-select v-model="val2" multiple :data="list" value-key="val" label-key="name"/>
                <link-button>val2:{{val2}}</link-button>
            </demo-row-item>
        </demo-row>
        <demo-row title="自定义内容">
            <link-select v-model="val1" :data="list" value-key="val" label-key="name">
                <template slot-scope="{item,index,checked}">
                    {{index}}、{{item.name}}==>>checked:{{checked}}
                </template>
            </link-select>
        </demo-row>
        <demo-row title="禁用与只读">
            <demo-row-item title="禁用">
                <link-select v-model="val1" :data="list" value-key="val" label-key="name" disabled/>
            </demo-row-item>
            <demo-row-item title="只读">
                <link-select v-model="val1" :data="list" value-key="val" label-key="name" readonly/>
            </demo-row-item>
        </demo-row>
        <demo-row title="支持设置盒子样式">
            <link-select :data="list" value-key="val" label-key="name" box-type="fill" box-color="success"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-select",
        data() {
            return {
                val1: '2',
                val2: [],
                list: [
                    {name: '西瓜', val: '1'},
                    {name: '南瓜', val: '2'},
                    {name: '冬瓜', val: '3'},
                    {name: '西红柿', val: '4'},
                    {name: '萝卜', val: '5'},
                    {name: '茄子', val: '6'},
                    {name: '柿子', val: '7'},
                    {name: '山药', val: '8'},
                    {name: '红薯', val: '9'},
                ]
            }
        },
    }
</script>

<style lang="scss">
    @include themeify{
        .demo-select {
            padding: $p-padding;
        }
    }
</style>