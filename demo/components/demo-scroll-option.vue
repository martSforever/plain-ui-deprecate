<template>
    <div class="demo-scroll-option">
        <demo-row :title="`基本用法:${val[0]}`">
            <link-scroll-option :data="data" labelKey="name" valueKey="value" @scroll="val=>scrollTop = val" v-model="val[0]"/>
            &nbsp;
            <!--<link-scroll-option :data="data" labelKey="name" valueKey="value" v-model="val[0]"/>-->
        </demo-row>
        <demo-row :title="`禁用部分选项:${val[1]}`">
            <link-scroll-option :data="data" labelKey="name" valueKey="value" disabledKey="invalid" v-model="val[1]"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-scroll-option",
        data() {
            return {
                scrollTop: 0,
                val: {
                    0: 'shanxi'
                },
                data: [
                    {name: '广东', value: 'guangdong', invalid: true},
                    {name: '上海', value: 'shanghai', invalid: false},
                    {name: '北京', value: 'beijing', invalid: true},
                    {name: '湖南', value: 'hunan', invalid: false},
                    {name: '湖北', value: 'hubei', invalid: true},
                    {name: '江西', value: 'jiangxi', invalid: false},
                    {name: '山西', value: 'shanxi', invalid: true},
                    {name: '天津', value: 'tianjin', invalid: false},
                    {name: '贵州', value: 'guizhou', invalid: true},
                    {name: '福建', value: 'fujian', invalid: false},
                    {name: '广西', value: 'guangxi', invalid: true},
                    {name: '山东', value: 'shandong', invalid: false},
                ],
            }
        },
    }
</script>

<style lang="scss">
    .demo-scroll-option {
        .demo-scroll-option-box {
            width: 100px;
        }
    }
</style>