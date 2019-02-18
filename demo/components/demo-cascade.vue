<template>
    <div class="demo-cascade">
        <demo-row title="基本用法">
            <link-cascade :data="cascadeData" label-key="label" children-key="children" value-key="value"/>
        </demo-row>
        <demo-row title="只显示最后一级数据">
            <link-cascade :data="cascadeData" label-key="label" children-key="children" value-key="value" :show-all-levels="false"/>
        </demo-row>
        <demo-row title="禁用选项">
            <link-cascade :data="cascadeData" label-key="label" children-key="children" value-key="value" disabled-key="disabled"/>
        </demo-row>
        <demo-row title="选中的时候就改变数据，而不是选择最后一级数据的时候才改变数据">
            <link-cascade :data="cascadeData" label-key="label" children-key="children" value-key="value" changeOnSelect/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-cascade",
        data() {
            return {
                cascadeData: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            disabled: true,
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        },
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        },
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        },
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        },
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }]
            }
        },
    }
</script>

<style lang="scss">

</style>