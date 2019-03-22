<template>
    <div class="demo-slider">
        <demo-row :title="'基本用法'+val0">
            <link-slider v-model="val0"/>
        </demo-row>
        <demo-row :title="'横向纵向，以及对其方式'+val1">
            <link-slider vertical v-model="val1"/>
            <link-slider vertical align-end v-model="val1"/>
            <link-slider v-model="val1"/>
            <link-slider v-model="val1" align-end/>
        </demo-row>
        <demo-row title="颜色">
            <link-slider v-model="val1" color="primary"/>
            <link-slider v-model="val1" color="success"/>
            <link-slider v-model="val1" color="warn"/>
            <link-slider v-model="val1" color="error"/>
            <link-slider v-model="val1" color="info"/>
        </demo-row>
        <demo-row :title="'设置总数'+val3">
            <link-slider v-model="val3" :total="1000"/>
        </demo-row>
        <demo-row :title="'设置滑块宽度'+val4">
            <link-slider v-model="val4" length="100px"/>
            <link-slider v-model="val4" length="200px"/>
            <link-slider v-model="val4" length="300px"/>
            <link-slider v-model="val4" full/>
        </demo-row>
        <demo-row title="范围选择">
            <link-slider range :start.sync="start" :end.sync="end" :total="200" length="300px"/>
            <link-button>start:{{start}}</link-button>
            <link-button>end:{{end}}</link-button>
        </demo-row>
        <demo-row title="禁用tooltip">
            <link-slider :tooltip="false"></link-slider>
        </demo-row>
        <demo-row title="格式化tooltip">
            <link-slider :tooltipFormatter="val=>val+'%'"></link-slider>
        </demo-row>
        <demo-row title="设置最大最小值">
            <link-slider :value="50" :max="80" :min="40"/>
            <link-slider range :start="60" :end="90" :max="150" :min="50" :total="200"/>
        </demo-row>
        <demo-row title="步骤分块">
            <link-slider :value="50" :step="10"/>
            <link-slider range length="300px" :step="10" :start.sync="start" :end.sync="end" :total="200"/>
        </demo-row>
        <demo-row title="禁用">
            <link-slider :value="50" disabled/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-slider",
        data() {
            return {
                val0: 40,
                val1: 20,
                val2: 10,
                val3: 200,
                val4: 20,
                start: 20,
                end: 40,
            }
        },
    }
</script>

<style lang="scss">

</style>