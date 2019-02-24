<template>
    <div class="demo-scroll-option">
        <demo-row title="基本用法">
            <link-scroll-option :data="data" labelKey="name" valueKey="value" @scroll="val=>scrollTop = val" v-model="scrollVal1"/>
            &nbsp;
            <link-scroll-option :data="data" labelKey="name" valueKey="value" @scroll="val=>scrollTop = val" v-model="scrollVal1"/>
        </demo-row>

    </div>
</template>

<script>
    export default {
        name: "demo-scroll-option",
        data() {
            return {
                scrollTop: 0,
                scrollVal1: 'shanxi',
                data: [
                    {name: '广东', value: 'guangdong'},
                    {name: '上海', value: 'shanghai'},
                    {name: '北京', value: 'beijing'},
                    {name: '湖南', value: 'hunan'},
                    {name: '湖北', value: 'hubei'},
                    {name: '江西', value: 'jiangxi'},
                    {name: '山西', value: 'shanxi'},
                    {name: '天津', value: 'tianjin'},
                    {name: '贵州', value: 'guizhou'},
                    {name: '福建', value: 'fujian'},
                    {name: '广西', value: 'guangxi'},
                    {name: '山东', value: 'shandong'},
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